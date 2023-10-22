const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("DataBaseForWebSite.db");

const startCommand = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,
    name VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL
);
CREATE TABLE IF NOT EXISTS chat (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    name VARCHAR REFERENCES users (name) NOT NULL,
    messages TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS review (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,
    name VARCHAR NOT NULL REFERENCES users (name),
    stars INTEGER NOT NULL,
    text TEXT NOT NULL
);

`;

class Database {
  async start() {
    db.run(startCommand);
  }
}

module.exports = new Database();
