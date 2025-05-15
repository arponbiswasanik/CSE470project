import express from "express";
import connectToDatabase from "../database.js";

const router = express.Router();

router.post("/rentCar", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const rent_collection = db.collection("Rent_Cars");
    const driver_collection = db.collection("Driver");

    const rent_car = await rent_collection.find({}).toArray();
    const drivers = await driver_collection.find({ status: true }).toArray();

    if (rent_car.length > 0 && drivers.length > 0) {
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];

      await driver_collection.updateOne(
        { _id: randomDriver._id },
        { $set: { status: false } }
      );

      const carsWithDriver = rent_car.map((car) => ({
        ...car,
        driver: randomDriver,
      }));

      res.status(200).json({
        success: true,
        data: carsWithDriver,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No cars or active drivers found.",
      });
    }
  } catch (error) {
    console.error("Error fetching cars and drivers:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching cars and drivers.",
    });
  }
});

export default router;
