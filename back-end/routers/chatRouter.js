const Router = require("express");
const chatController = require("../controllers/chatController");
const router = new Router();

router.get("/", chatController.getMessages);
router.post("/", chatController.addMessages);
router.delete("/deleteMessage", chatController.deleteMessage);

module.exports = router;
