const Router = require("express");
const reviewController = require("../controllers/reviewController");
const router = new Router();

router.get("/", reviewController.getReview);
router.post("/", reviewController.addReview);

module.exports = router;
