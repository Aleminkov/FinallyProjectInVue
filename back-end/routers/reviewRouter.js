const Router = require("express");
const reviewController = require("../controllers/reviewController");
const router = new Router();

router.get("/get-review", reviewController.getReview);
router.post("/add-review", reviewController.addReview);

module.exports = router