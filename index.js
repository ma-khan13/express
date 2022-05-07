const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
require('dotenv').config();
// const cors = require("cors");
const app = express();
// app.use(cors());

const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@testmongo.oifwx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("hero_stock").collection("stockItem");

    app.post("/user", (req, res) => {
      const newUser = req.body;
      let user = userCollection.insertOne(newUser);
      res.send({ status: "Success" });
    });
    app.get('/', (req, res) => {
      res.send('Ok')
    })
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Server is running port on", port);
});
