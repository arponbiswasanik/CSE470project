import express from "express";
import connectToDatabase from "./database.js";

const router = express.Router();

router.post("/user_history", async (req, res) => {
  const { name, email, phone, paymentMethod, car } = req.body;

  if (!name || !email || !phone || !paymentMethod || !car ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Reference the 'User_history' collection
    const collection = db.collection("Transaction_history");

    // Create the document to insert
    const newHistory = {
      name,
      email,
      phone,
      paymentMethod,
      car,
    
      transactionid: Math.floor(Math.random() * 1000000), // Generate a random transaction ID
      timestamp: new Date(), // Add a timestamp field
    };

    // Insert the document into the collection
    const result = await collection.insertOne(newHistory);



    // const Transaction_history_Collection=db.collection('Transaction_history');
    // const Transaction_history = await Transaction_history_Collection.find({}).toArray();


    res.status(201).json({
      message: "User history saved successfully.",
      insertedId: result.insertedId, // Return the inserted document ID
    });

    // res.status(200).json({ success: true,  transaction_history: Transaction_history });
  } catch (error) {
    console.error("Error saving user history:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export default router;
