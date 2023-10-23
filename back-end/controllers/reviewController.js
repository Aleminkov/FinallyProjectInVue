const ApiError = require("../Error/ApiError");
const { getAllReview, addReview } = require("../db");

class reviewController {

  //Добавляет отзыв
  async addReview(req, res, next) {
    const { name, stars, desc } = req.body;

    try {
      await addReview(name, stars, desc);

      return res.json({ message: "Всё прошло успешно", result: true });
    } catch (error) {
      console.log(error);
      next(ApiError.interval("Что то пошло не так"));
    }
  }

  //Отдает отзыв
  async getReview(req, res) {
    const reviews = await getAllReview();

    return res.json(reviews);
  }
}

module.exports = new reviewController();
