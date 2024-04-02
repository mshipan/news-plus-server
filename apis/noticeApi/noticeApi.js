const express = require("express");
const noticeApi = (noticeCollection) => {
  const noticeRouter = express.Router();

  //   add notice
  noticeRouter.post("/", async (req, res) => {
    const notice = req.body;
    const result = await noticeCollection.insertOne(notice);
    res.send(result);
  });

  //   get notice
  noticeRouter.get("/");

  return noticeRouter;
};

module.exports = noticeApi;
