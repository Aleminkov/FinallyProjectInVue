const Router = require("express");
const userRouter = require('./userRouter')

const routers = new Router();

routers.use('/user', userRouter);

module.exports = routers;
