const express = require("express");

const usersApi = (usersCollection) => {
  const userRouter = express.Router();

  //   store user in db
  userRouter.post("/", async (req, res) => {
    const user = req.body;
    console.log(user);
    const query = { uid: user.email };
    const existingUser = await usersCollection.findOne(query);
    if (existingUser) {
      return res.send("user already exists");
    }
    const result = await usersCollection.insertOne(user);
    res.send(result);
  });

  return userRouter;
};
module.exports = usersApi;
