import connectToDatabase from './database.js'; // Import the database connection function
import express from 'express';
import multer from 'multer'; // Import multer



const router = express.Router();

router.post('/displaydata', async (req, res) => {
  
  try {
  
    const cars = await connectToDatabase();
    const New_cars_Collection=cars.collection('New_cars');
  
    const New_cars = await New_cars_Collection.find({}).toArray();

    const Used_cars_Collection=cars.collection('Used_cars');

    const Used_cars = await Used_cars_Collection.find({}).toArray();

    
    const Rent_Cars_Collection=cars.collection('Rent_Cars');

    const Rent_Cars = await Rent_Cars_Collection.find({}).toArray();

    const Repair_Collection=cars.collection('Parts');

    const Repair= await Repair_Collection.find({}).toArray();

    if (!New_cars.length) {
      return res.status(404).json({
        success: false,
        message: 'Car data not found',
      });
    }else{

      res.status(200).json({success: true, new_cars : New_cars , used_cars: Used_cars, rent_cars: Rent_Cars, repair: Repair});
    }
  } catch (error) {
    console.error('Error retrieving car data:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the filename
  },
});

const upload = multer({ storage });

router.post('/uploadcars', upload.single('img'), async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      price,
      mileage,
      color,
      transmission,
      label,
      details,
      description,
      purchase_location,
    } = req.body;

    
    const img = req.file ? req.file.path : null;
    const cars = await connectToDatabase();
    const Used_cars_Collection = cars.collection('Used_cars');

    const result = await Used_cars_Collection.insertOne({
      brand,
      model,
      year,
      price,
      mileage,
      color,
      transmission,
      label:'used',
      details,
      description,
      img, 
      condition: 'New',
      purchase_location,
      offer_price: 'Negotiable',
      status: '',
    });

    res.status(200).json({
      success: true,
      message: 'Car uploaded successfully',
      carId: result.insertedId,
    });
  } catch (error) {
    console.error('Error uploading car:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload the car. Please try again.',
      error: error.message,
    });
  }
});



export default router;

