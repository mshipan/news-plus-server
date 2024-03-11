const express = require("express");

const usersApi = (usersCollection) => {
  const userRouter = express.Router();

  //   store user in db
  userRouter.post("/", async (req, res) => {
    const user = req.body;
    const query = { uid: user.email };
    const existingUser = await usersCollection.findOne(query);
    if (existingUser) {
      return res.send("user already exists");
    }
    const result = await usersCollection.insertOne(user);
    res.send(result);
  });

  // get all users
  userRouter.get("/", async (req, res) => {
    let query = {};
    const email = req.query.email;
    if (req.query.email) {
      query: {
        email: email;
      }
    }
    const result = await usersCollection.find(query).toArray();
    res.send(result);
  });
  return userRouter;
};
module.exports = usersApi;
