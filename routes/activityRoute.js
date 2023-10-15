const express = require("express");
const { requireSignIn } = require("../middleware/authMiddleware");
const {
  addCommentController,
  editCommentController,
  getCommentController,
  deleteCommentController,
} = require("../controller/commentController");
const {
  addwishlistController,
  getWishlistController,
  checkWishlistController,
  deleteWishlistController,
} = require("../controller/wishlistController");
const {
  braintreeTokenController,
  braintreePaymentController,
  checkSubscriptionController,
} = require("../controller/subscriptionController");

const router = express.Router();

router.get("/comment/:movieID", getCommentController);
router.post("/comment", requireSignIn, addCommentController);
router.put("/comment/:id", requireSignIn, editCommentController);
router.delete("/comment/:id", requireSignIn, deleteCommentController);
router.post("/wishlist", requireSignIn, addwishlistController);
router.get("/wishlist", requireSignIn, getWishlistController);
router.get("/wishlist/:movieID", requireSignIn, checkWishlistController);
router.delete("/wishlist/:id", requireSignIn, deleteWishlistController);
router.get("/braintree/token", braintreeTokenController);
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
router.get("/checkSubscription", requireSignIn, checkSubscriptionController);
module.exports = router;
