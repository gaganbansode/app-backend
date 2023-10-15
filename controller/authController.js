const { compare } = require("bcryptjs");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const postData = req.body;
    // check user
    const existingUser = await userModel.findOne({ email: postData.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    } else {
      const postData = req.body;
      const hashedPassword = await hashPassword(postData.password);
      postData.password = hashedPassword;
      const user = await new userModel(postData).save();
      res.status(200).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
    }
  } catch (error) {
    res.status().send({
      success: false,
      message: "Error in registeration",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not exit",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Password is incorrect",
      });
    }
    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email) {
      res.status(400).send({ success: false, message: "Email is required" });
    } else if (!answer) {
      res.status(400).send({ success: false, message: "Answer is required" });
    } else if (!newPassword) {
      res
        .status(400)
        .send({ success: false, message: "New Password is required" });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(5000).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
};
