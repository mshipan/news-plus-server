const express = require("express");

const postApi = (postCollection) => {
  const postRouter = express.Router();

  // query search for posts
  postRouter.get("/", async (req, res) => {
    let query = {};
    const category = req.query.category;
    const subCategory = req.query.subCategory;
    if (req.query.category) {
      query.category = category;
    }
    if (req.query.subCategory) {
      query.subCategory = subCategory;
    }
    const result = await postCollection.find(query).toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.send(result);
  });

  postRouter.post("/", async (req, res) => {
    const newPost = req.body;
    const result = await postCollection.insertOne(newPost);
    res.send(result);
  });
  return postRouter;
};

module.exports = postApi;
