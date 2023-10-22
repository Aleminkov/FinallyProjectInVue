const Router = require("express");
const userRouter = require("./userRouter");
const reviewRouter = require("./reviewRouter");
const chatRouter = require("./chatRouter");

const routers = new Router();

routers.use("/user", userRouter);
routers.use("/review", reviewRouter);
routers.use("/chat", chatRouter);

module.exports = routers;
