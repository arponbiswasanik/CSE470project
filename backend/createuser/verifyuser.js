import express from 'express';
import multer from 'multer'; // Import multer
import addUser from './user.js';
import connectToDatabase from "../database.js";

const router = express.Router();


const upload = multer({ dest: 'uploads/' }); 

router.post('/verify', upload.single('image'), async (req, res) => {
    const { name, email, password, country, state, nid,} = req.body;
    const img = req.file ? req.file.path : null; // Get the file path if uploaded

    try {
        const db = await connectToDatabase();
        const collection = db.collection("Users");

        // Check if the user already exists by email
        const existingUser = await collection.findOne({ email });
        console.log(existingUser);

        if (existingUser) {
            
            const updatedUser = await collection.updateOne(
                { email }, // Find the user by email
                {
                    $set: {
                        verified: false,   // Mark the user as verified
                        nid: nid,         // Add or update NID
                        img: img,         // Add or update image
                        submit: true     // Reset the submit status
                    }
                }
            );

            if (updatedUser.modifiedCount > 0) {
                
                return res.status(200).json({ success: true, message: 'User verified successfully' });
            } else {
                
                return res.status(400).json({ success: false, message: 'Failed to update user information' });
            }
        } else {
            
            const result = await addUser({
                name,
                email,
                password,
                country,
                state,
                nid,
                img,
                verified: false,// Initially set verify to false
                submit: false
            });

            if (result.success) {
                // Send a success response if the user was added successfully
                return res.status(201).json({ success: true, message: 'User created successfully' });
            } else {
                // If user creation fails
                return res.status(500).json({ success: false, message: 'Failed to create new user' });
            }
        }
    } catch (error) {
        console.error('Error processing verification request:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;
