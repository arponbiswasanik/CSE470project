import express from "express";
import addUser from "./booking.js";
import connectToDatabase from "../database.js";

const destinations = [
  { to: "Dhaka", from: "Khulna", distance: 150 },
  { to: "Dhaka", from: "Cox Bazar", distance: 300 },
  { to: "Dhaka", from: "Sylhet", distance: 250 },
  { to: "Dhaka", from: "Rajshahi", distance: 200 },
  { to: "Dhaka", from: "Barishal", distance: 180 },
  { to: "Dhaka", from: "Rangpur", distance: 220 },
  { to: "Dhaka", from: "Mymensingh", distance: 160 },
  { to: "Dhaka", from: "Jessore", distance: 170 },
  { to: "Dhaka", from: "Comilla", distance: 190 },
  { to: "Dhaka", from: "Narayanganj", distance: 140 },
  { to: "Dhaka", from: "Bogra", distance: 210 },
  { to: "Dhaka", from: "Dinajpur", distance: 230 },
  { to: "Dhaka", from: "Feni", distance: 240 },
  { to: "a", from: "b", distance: 260 },
];

const router = express.Router();

router.post("/book", async (req, res) => {
  console.log("Request Body:", req.body);
  const {
    name,
    number,
    PickUp,
    Where_to_go,
    carId,
    carBrand,
    carModel,
    carYear,
    carColor,
    carSit,
    carDetails,
    carImg,
  } = req.body;

  try {
    const normalizedPickUp = PickUp.trim().toLowerCase();
    const normalizedWhereToGo = Where_to_go.trim().toLowerCase();

    const route = destinations.find(
      (d) =>
        d.to.toLowerCase() === normalizedPickUp &&
        d.from.toLowerCase() === normalizedWhereToGo
    );

    if (!route) {
      return res.status(400).json({
        success: false,
        message: `Invalid route from ${Where_to_go} to ${PickUp}.`,
      });
    }

    const ratePerKm = carSit > 4 ? 8 : 5;
    const price = route.distance * ratePerKm;

    if (!carId) {
      return res.status(400).json({
        success: false,
        message: "Car ID is missing.",
      });
    }

    const db = await connectToDatabase();
    const collection = db.collection("Book_car");

    const existingUser = await collection.findOne({ number });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this phone number already exists",
      });
    }

    const result = await addUser({
      name,
      number,
      PickUp,
      Where_to_go,
      price,
      carId,
      carBrand,
      carModel,
      carYear,
      carColor,
      carSit,
      carDetails,
      carImg,
    });

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(500).json({
        success: false,
        message: result.message || "Failed to add booking",
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
