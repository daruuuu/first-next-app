// POST new-meetup.js

// Path: pages\api\new-meetup.js

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    // Store in a database or in a file
    const client = await MongoClient.connect(
      "mongodb+srv://nasirebus:7FEfzXKB8ZbuPcPH@cluster0.jiceikd.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db("meetups");

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Success!" });
  }
};

export default handler;
