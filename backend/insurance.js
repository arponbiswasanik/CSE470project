import express from 'express';
 // Import ObjectId to handle MongoDB object IDs
import connectToDatabase from './database.js';


const router = express.Router();

// Route to calculate and save insurance history
router.post('/insurance', async (req, res) => {
  try {
    // Destructure the data from the request body
    const { carDetails, driverDetails, policyDetails, premium ,email } = req.body;

    // console.log('carDetails', carDetails);
    // console.log('driverDetails', driverDetails);
    // console.log('policyDetails', policyDetails);
    // console.log('premium', premium);
    // console.log('email', email);

    // Ensure that all required fields are provided
    if (!carDetails || !driverDetails || !policyDetails || !premium) {
      return res.status(400).json({
        message: 'Missing required fields. Please check the request data.',
      });
    }

    // Structure the insurance history object
    const newInsuranceHistory = {
      email,
      carDetails,
      driverDetails,
      policyDetails,
      premium: parseFloat(premium), // Convert premium to float
      timestamp: new Date(),
      submit: false,
      approved: false,
    };

    // Connect to the database
    const db = await connectToDatabase();
    // Reference the 'Insurance' collection
    const collection = db.collection('Insurance');

    // Insert the document into the collection
    const result = await collection.insertOne(newInsuranceHistory);

    // Respond with the success message and the calculated premium
    res.status(201).json({
      message: 'Insurance history saved successfully.',
      premium: newInsuranceHistory.premium,
      _id: result.insertedId.toString(), // Return the _id for future updates
    });
  } catch (error) {
    console.error('Error saving insurance history:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Route to check insurance status and update submit flag
router.post('/applyinsurance', async (req, res) => {
  try {
    const { email } = req.body; // Extract email from the request body

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    console.log(email); // Log the email for debugging

    const db = await connectToDatabase(); // Connect to database
    const collection = db.collection('Insurance'); // Select the Insurance collection
    const user = await collection.findOne({ email }); // Find the user by email

    // Update the 'submit' field for the document with the provided email
    const updateResult = await collection.updateOne(
      { email: email }, // Find the document by email
      { $set: { submit: true } } // Set 'submit' to true
    );
    console.log(user.submit);
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found or already submitted' });
    }

    // Send the response back after the update
    res.status(200).json({
      message: 'Insurance application has been submitted.',
      insuranceStatus: 'Submitted',
    });
  } catch (error) {
    console.error('Error processing insurance application:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});



export default router;
