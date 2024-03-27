const express = require("express");

const commentApi = (commentCollection) => {
  const commentRouter = express.Router();

  //   add comment
  commentRouter.post("/", async (req, res) => {
    const commentInfo = req.body;
    const result = await commentCollection.insertOne(commentInfo);
    res.send(result);
  });

  //   get comment by news id
  commentRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
  });
  return commentRouter;
};
module.exports = commentApi;
