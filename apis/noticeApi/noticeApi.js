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
  noticeRouter.get("/", async (req, res) => {
    const result = await noticeCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.send(result);
  });

  //   add isOpened value
  noticeRouter.patch("/isOpened/:email", async (req, res) => {
    const email = req.params.email;
    const notices = await noticeCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    const lastNotice = notices[0];
    const existingEmail = lastNotice?.isOpened.filter((item) => item === email);
    if (existingEmail.length === 0) {
      lastNotice.isOpened.push(email);
      const updatedDoc = { $set: lastNotice };
      const result = await noticeCollection.updateOne(
        { _id: lastNotice._id },
        updatedDoc
      );
      res.send(result);
    }
    return;
  });

  return noticeRouter;
};

module.exports = noticeApi;
