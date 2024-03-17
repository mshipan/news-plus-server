const express = require("express");
const { ObjectId } = require("mongodb");

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
    const result = await postCollection
      .find(query)
      .sort({ publishDate: -1 })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.send(result);
  });

  // single post apis
  postRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await postCollection.findOne(query);
    res.send(result);
  });

  // post api
  postRouter.post("/", async (req, res) => {
    const newPost = req.body;
    const result = await postCollection.insertOne(newPost);
    res.send(result);
  });
  return postRouter;
};

module.exports = postApi;
