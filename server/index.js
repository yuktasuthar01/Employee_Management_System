const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.json());

const url = process.env.MONGO_URL; 
const dbName = process.env.MONGO_DB_NAME;
let db;

async function connectToMongo() {
  await new Promise((resolve) => setTimeout(resolve, 10000)); // Add a delay of 10 seconds
  try {
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
    });
    db = client.db(dbName);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("⚠️ Error connecting to MongoDB:", err);
  }
}

connectToMongo();

app.get("/employees", async (req, res) => {
  try {
    const collection = db.collection("employees");
    const result = await collection.find({}).toArray();
    res.send(result);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).send("Error fetching employees: " + err.message);
  }
});

app.post("/create", async (req, res) => {
  const collection = db.collection("employees");
  const newEmployee = {
    name: req.body.name,
    age: req.body.age,
    country: req.body.country,
    position: req.body.position,
    wage: req.body.wage,
  };

  try {
    const result = await collection.insertOne(newEmployee);
    res.send("Values Inserted");
  } catch (err) {
    console.error("Error inserting employee:", err);
    res.status(500).send("Error inserting employee: " + err.message);
  }
});
const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});