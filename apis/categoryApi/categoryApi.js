const express = require("express");

const categoryApi = (categoriesCollection) => {
  const categoryRouter = express.Router();

  // apis here
  categoryRouter.get("/", async (req, res) => {
    const result = await categoriesCollection.find().toArray();
    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }
    res.send(result);
  });

  categoryRouter.get("/:selectedCategory", async (req, res) => {
    const selectCategory = req.params.selectedCategory;

    const filter = {
      categoryName: selectCategory,
    };
    const result = await categoriesCollection.find(filter).toArray();
    res.send(result);
  });

  categoryRouter.post("/", async (req, res) => {
    const categoryInfo = req.body;
    const query = { slug: req.body.slug };
    const foundData = await categoriesCollection.findOne(query);
    if (foundData?.slug === categoryInfo.slug) {
      return res.status(404).json({ message: "Slug already listed" });
    }

    const result = await categoriesCollection.insertOne(categoryInfo);
    res.send(result);
  });
  return categoryRouter;
};
module.exports = categoryApi;
