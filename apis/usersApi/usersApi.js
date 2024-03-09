const express = require("express");

const usersApi = (usersCollection) => {
  const userRouter = express.Router();
  userRouter.post("", async (req, res) => {});
  return userRouter;
};
module.exports = usersApi;
