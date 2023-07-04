const express = require("express");
const router = express.Router();

const { createReview, getReviews } = require("../controllers/reviews");
const { protect, authorize } = require("../middleware/auth");

router.route("/").post(protect, authorize("client", "admin"), createReview);
router.route("/:workerId").get(protect, getReviews);

module.exports = router;
