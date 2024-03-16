const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

// Increase payload size limit (e.g., 50MB)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Import API modules
const postApi = require("./apis/postApi/postApi");
const usersApi = require("./apis/usersApi/usersApi");
const categoryApi = require("./apis/categoryApi/categoryApi");
const logoApi = require("./apis/logoApi/logoApi");
const advertisementApi = require("./apis/advertisementApi/advertisementApi");
const facebookApi = require("./apis/socialMediaApi/facebookApi");
const twitterApi = require("./apis/socialMediaApi/twitterApi");

const corsConfig = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// middlewares
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.json());

//mongodb start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oewoyvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //collection start
    const postCollection = client.db("sunwings-news").collection("posts");
    const usersCollection = client.db("sunwings-news").collection("users");
    const categoryCollection = client
      .db("sunwings-news")
      .collection("categories");
    const logoCollection = client.db("sunwings-news").collection("logos");
    const advertisementCollection = client
      .db("sunwings-news")
      .collection("advertisements");
    const faceookCollection = client.db("sunwings-news").collection("facebook");
    const twitterCollection = client.db("sunwings-news").collection("twitter");

    //collection end

    // Apis Start
    app.use("/posts", postApi(postCollection));
    app.use("/users", usersApi(usersCollection));
    app.use("/categories", categoryApi(categoryCollection));
    app.use("/logos", logoApi(logoCollection));
    app.use("/advertisements", advertisementApi(advertisementCollection));
    app.use("/facebook", facebookApi(faceookCollection));
    app.use("/twitter", twitterApi(twitterCollection));
    // Apis End

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//mongodb end

// basic setup
app.get("/", (req, res) => {
  res.send("Sunwings News Server is Running.");
});

app.listen(port, () => {
  console.log(`Sunwings News Server is Running on PORT: ${port}`);
});
