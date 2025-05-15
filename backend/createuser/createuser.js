import express from 'express';
import addUser  from './user.js'; 
import connectToDatabase from "../database.js";

const router = express.Router();

router.post('/createuser', async (req, res) => {
    const { name, email, password, country, state } = req.body;

    try {
        const db = await connectToDatabase();
        const collection = db.collection("Users");
        const existingUser  = await collection.findOne({ email });

        if (existingUser ) {
            return res.status(400).json({ success: false, message: 'User  with this email already exists' });
        }
        const result = await addUser ({ name, email, password, country, state });
    } catch {
        console.log("user info not received");
    }
});

export default router;