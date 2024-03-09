const express = require("express");

const postApi = (postCollection) => {
  const postRouter = express.Router();
  postRouter.get("/", async (req, res) => {
    const result = await postCollection.find().toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.send(result);
  });
  return postRouter;
};

module.exports = postApi;
