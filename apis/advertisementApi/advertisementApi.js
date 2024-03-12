const express = require("express");

const advertisementApi = (advertisementCollection) => {
  const advertisementRouter = express.Router();

  advertisementRouter.get("/", async (req, res) => {
    const result = await advertisementCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.send(result);
  });

  advertisementRouter.post("/", async (req, res) => {
    const newAdvertisement = req.body;
    const result = await advertisementCollection.insertOne(newAdvertisement);
    res.send(result);
  });

  return advertisementRouter;
};

module.exports = advertisementApi;
