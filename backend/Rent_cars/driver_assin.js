import express from "express";
const router = express.Router();
import connectToDatabase from "../database.js";

router.post("/assignDriver", async (req, res) => {
  let db = null;
  try {
    db = await connectToDatabase();
    const driverCollection = db.collection("Driver");

    const availableDrivers = await driverCollection
      .find({ status: true })
      .toArray();
    if (availableDrivers.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No drivers available." });
    }

    const assignedDriver =
      availableDrivers[Math.floor(Math.random() * availableDrivers.length)];

    await driverCollection.updateOne(
      { _id: assignedDriver._id },
      { $set: { status: false } }
    );

    res.json({ success: true, driver: assignedDriver });
  } catch (error) {
    console.error("Error assigning driver:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
});

export default router;
