var braintree = require("braintree");
const planSchema = require("../models/planModel");
require("dotenv").config();
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const braintreePaymentController = async (req, res) => {
  const planPric = [0, 5, 12, 20];
  try {
    const { nonce, plan } = req.body;
    let newTransaction = gateway.transaction.sale(
      {
        amount: planPric[plan],
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const Splane = new planSchema({
            plan,
            payment: result,
            userID: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const checkSubscriptionController = async (req, res) => {
  try {
    const userID = req.user._id;
    const plan = await planSchema.findOne({ userID });
    if (plan) {
      res.status(200).send({
        success: true,
        plan,
      });
    } else {
      res.status(200).send({
        success: false,
      });
    }
  } catch (error) {}
};

module.exports = {
  braintreeTokenController,
  braintreePaymentController,
  checkSubscriptionController,
};
