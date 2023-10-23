const Router = require("express");
const chatController = require("../controllers/chatController");
const router = new Router();

router.get("/getMessage", chatController.getMessages);
router.post("/addMessage", chatController.addMessages);
router.delete("/deleteMessage", chatController.deleteMessage);

module.exports = router;
