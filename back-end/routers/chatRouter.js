const Router = require("express");
const chatController = require("../controllers/chatController");
const router = new Router();

router.get("/message", chatController.getMessages);
router.post("/message", chatController.addMessages);
router.delete("/deleteMessage", chatController.getMessages);

module.exports = router;
