const ApiError = require("../Error/ApiError");
const { createNewMessage, getAllMessage, deletMessage } = require("../db");

class chatController {
  //Добавляет сообщение
  async addMessages(req, res) {
    const { name, message } = req.body;

    try {
      await createNewMessage(name, message);

      return res.json({ message: "", result: true });
    } catch (e) {
      console.log(e);
      ApiError.interval(e);
    }
  }

  //Отдает сообщения
  async getMessages(req, res) {
    try {
      const messages = await getAllMessage();
      return res.json({ messages: messages, result: true });
    } catch (e) {
      console.log(e);
      ApiError.badRequest(e);
    }
  }

  //Удаляет сообщение
  async deleteMessage(req, res) {
    const { id } = req.body;
    try {
      await deletMessage(id);
      return res.json({ message: "", result: true });
    } catch (error) {
      console.log(error);
      ApiError.badRequest(error);
    }
  }
}

module.exports = new chatController();
