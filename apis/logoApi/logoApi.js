const express = require("express");

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
    const result = await logoCollection.insertOne(newLogo);
    res.send(result);
  });

  return logoRouter;
};

module.exports = logoApi;
