const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("DataBaseForWebSite.db");
const {
  startCommand,
  startCommand2,
  startCommand3,
  findUserCommand,
  createUserCommand,
  findEmailCommand,
  checkUserCommand,
  selectAllReview,
  addReviewCommand,
  addNewMessageCommand,
  getMessagesCommand,
  deleteMessageCommand,
} = require("./dbCommands");

class Database {
 
  //Для старта бэка
  async start() {
    try {
      db.run(startCommand);
      db.run(startCommand2);
      db.run(startCommand3);
      console.log("База данных подключена.");
    } catch (error) {
      console.log(error);
    }
  }
  
  //Ищет пользователя для логина
  async findUser(email, password) {
    return new Promise((resolve, reject) => {
      db.get(findUserCommand, [email, password], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  
  //Создает пользователя
  async createUser(name, email, password) {
    return new Promise((reslove, reject) => {
      db.run(createUserCommand, [name, email, password], (err, result) => {
        if (err) {
          reject(err);
        }
        reslove(result);
      });
    });
  }

  //Смотри нет ли такого же email
  async checkEmail(email) {
    return new Promise((reslove, reject) => {
      db.all(findEmailCommand, [email], (err, result) => {
        if (err) {
          reject(err);
        }
        reslove(result);
      });
    });
  }
  
  //Проверяет есть ли такое имя
  async checkUser(name) {
    return new Promise((reslove, reject) => {
      db.all(checkUserCommand, [name], (err, result) => {
        if (err) {
          reject(err);
        }
        reslove(result);
      });
    });
  }
  
  //Получает все отзывы
  async getAllReview() {
    return new Promise((reslove, reject) => {
      db.all(selectAllReview, (err, result) => {
        if (err) {
          reject(err);
        }
        reslove(result);
      });
    });
  }
 
  //Добавляет отзывы
  async addReview(name, star, desc) {
    return new Promise((reslove, reject) => {
      db.run(addReviewCommand, [name, star, desc], (err, result) => {
        if (err) {
          reject(err);
        }
        reslove(result);
      });
    });
  }
 
  //Добавляет сообщение в чат
  async createNewMessage(name, message) {
    return new Promise((reslove, reject) => {
      db.run(addNewMessageCommand, [name, message], (err, result) => {
        if (err) {
          reject(err);
        }
        reslove(result);
      });
    });
  }
 
  //Получает все сообщения
  async getAllMessage() {
    return new Promise((reslove, reject) => {
      db.all(getMessagesCommand, (err, result) => {
        if (err) {
          reject(err);
        }
        reslove(result);
      });
    });
  }

  //Удаляет сообщение
  async deletMessage(id) {
    return new Promise((reslove,reject)=>{
      db.run(deleteMessageCommand,[id],(err,result)=>{
        if(err){
          reject(err)
        }
        reslove(result)
      })
    })
  }
}

module.exports = new Database();
