const express = require("express");
const { ObjectId } = require("mongodb");

const facebookApi = (facebookCollection) => {
  const facebookRouter = express.Router();

  facebookRouter.get("/", async (req, res) => {
    const result = await facebookCollection.find().toArray();

    res.send(result);
  });

  facebookRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await facebookCollection.findOne(query);
    res.send(result);
  });

  // facebookRouter.patch("/:id", async (req, res) => {
  //   const id = req.params.id;
  //   const filter = { _id: new ObjectId(id) };
  //   const facebook = req.body;
  //   const updateFacebook = {
  //     $set: {
  //       title: facebook.title,
  //       link: facebook.link,
  //       profilePhoto: facebook.profilePhoto,
  //       coverPhoto: facebook.coverPhoto,
  //     },
  //   };
  //   const result = await facebookCollection.updateOne(filter, updateFacebook);
  //   res.send(result);
  // });

  return facebookRouter;
};

module.exports = facebookApi;
