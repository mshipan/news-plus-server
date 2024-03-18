const express = require("express");
const { ObjectId } = require("mongodb");

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
    newAdvertisement.isSelected = false;
    const result = await advertisementCollection.insertOne(newAdvertisement);
    res.send(result);
  });

  advertisementRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const { isSelected } = req.body;
    const filter = { _id: new ObjectId(id) };
    const updateAd = {
      $set: {
        isSelected: isSelected,
      },
    };
    const result = await advertisementCollection.updateOne(filter, updateAd);
    res.send(result);
  });

  return advertisementRouter;
};

module.exports = advertisementApi;
