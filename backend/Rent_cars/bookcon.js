import express from "express";
import { ObjectId } from "mongodb";
import connectToDatabase from "../database.js";

const router = express.Router();

router.get("/admin_booking", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const bookCarCollection = db.collection("Book_car");

    const bookings = await bookCarCollection.find().toArray();

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings from database:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching bookings.",
    });
  }
});

router.put("/admin_booking/:id", async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  try {
    const db = await connectToDatabase();
    const bookCarCollection = db.collection("Book_car");

    if (!ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format.",
      });
    }

    const booking = await bookCarCollection.findOne({
      _id: new ObjectId(bookingId),
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const validStatuses = ["approved", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'approved' or 'cancelled'.",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Booking status is not 'pending'. It cannot be updated.",
      });
    }

    const result = await bookCarCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: `Booking status updated to '${status}'.`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Booking not found or status unchanged.",
      });
    }
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the booking status.",
    });
  }
});

export default router;
