require("dotenv").config();
const Express = require("express");
const cors = require('cors');
const routers = require("./routers/index");
const Database = require('./db');
const ErrorHandlerMiddleware = require('./Middleware/ErrorHandlerMiddleware')

const app = Express();
const PORT = 4000 || process.env.PORT;

app.use(Express.json());
app.use(cors());
app.use('/api', routers);

app.use(ErrorHandlerMiddleware);

const start = async () => {
  try {
    await Database.start()
    app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();