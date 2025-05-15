import express from "express";
import connectToDatabase from "./database.js";

const router = express.Router();

router.post("/post", async (req, res) => {
  const {
    brand,
    model,
    year,
    price,
    mileage,
    color,
    transmission,
    description,
    img,
    label,
    details,
    condition,
    purchase_location,
    offer_price,
  } = req.body;

  if (
    !brand ||
    !model ||
    !year ||
    !price ||
    !mileage ||
    !color ||
    !transmission ||
    !description ||
    !img
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Reference the 'User_history' collection
    const collection = db.collection("Used_cars");

    // Create the document to insert
    const postcar = {
      brand,
      model,
      year,
      price,
      mileage,
      color,
      transmission,
      label,
      details,
      img,
      condition,
      purchase_location,
      offer_price,
      status: "",
    };

    // Insert the document into the collection
    const result = await collection.insertOne(postcar);



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
