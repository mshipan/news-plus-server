const express = require("express");
const { ObjectId } = require("mongodb");

const logoApi = (logoCollection) => {
  const logoRouter = express.Router();

  logoRouter.get("/", async (req, res) => {
    const result = await logoCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.send(result);
  });

  logoRouter.post("/", async (req, res) => {
    const newLogo = req.body;
    newLogo.isSelected = false;
    const result = await logoCollection.insertOne(newLogo);
    res.send(result);
  });

  logoRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const { isSelected } = req.body;
    const filter = { _id: new ObjectId(id) };
    const updateLogo = {
      $set: {
        isSelected: isSelected,
      },
    };
    const result = await logoCollection.updateOne(filter, updateLogo);
    res.send(result);
  });

  return logoRouter;
};

module.exports = logoApi;
