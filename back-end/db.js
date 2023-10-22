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
} = require("./dbCommands");

class Database {
  async start() {
    try {
      db.run(startCommand);
      db.run(startCommand2);
      db.run(startCommand3);
      console.log('База данных подключена.');
    } catch (error) {
      console.log(error);
    }
  }
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
}

module.exports = new Database();
