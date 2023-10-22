const startCommand = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,
    name VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL
);`;

const startCommand2 = `CREATE TABLE IF NOT EXISTS review (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,
    name VARCHAR NOT NULL REFERENCES users (name),
    stars INTEGER NOT NULL,
    text TEXT NOT NULL
);`;

const startCommand3 = `CREATE TABLE IF NOT EXISTS chat (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    name VARCHAR REFERENCES users (name) NOT NULL,
    messages TEXT NOT NULL
);`;

const findUserCommand = `Select * FROM users WHERE email = ? AND password = ?`;

const createUserCommand = `INSERT INTO users(name,email,password) VALUES(?,?,?)`;

const findEmailCommand = `Select * FROM users WHERE email = ?`;

const checkUserCommand = `Select * FROM users WHERE name = ?`;

module.exports = {
  startCommand,
  startCommand2,
  startCommand3,
  findUserCommand,
  createUserCommand,
  findEmailCommand,
  checkUserCommand,
};
