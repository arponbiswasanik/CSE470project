import express from "express";
import connectToDatabase from "../database.js";
import { ObjectId } from "mongodb"; // Import ObjectId for handling _id fields

const router = express.Router();


router.get('/kyc', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("Users");

        const submittedUsers = await collection.find({ submit: true }).toArray();

        if (submittedUsers.length === 0) {
            return res.status(404).json({ success: false, message: "No users have submitted KYC." });
        }

        res.status(200).json({ success: true, kyc: submittedUsers });
        
    } catch (error) {
        console.error("Error fetching submitted KYC users:", error);
        res.status(500).json({ success: false, message: "Internal Server Error. Could not fetch KYC data." });
    }
});


router.post('/kyc/:id/accept', async (req, res) => {
    try {
        const { id } = req.params;

 
        const db = await connectToDatabase();
        const collection = db.collection("Users");

        const result = await collection.updateOne(
            { _id: new ObjectId(id) }, 
            { $set: { verified: true , submit: false}  }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, message: "KYC application accepted." });
        
    } catch (error) {
        console.error("Error accepting KYC application:", error);
        res.status(500).json({ success: false, message: "Internal Server Error. Could not accept the KYC application." });
    }
});


router.post('/kyc/:id/reject', async (req, res) => {
    try {
        const { id } = req.params;

        // Convert id to ObjectId
        const db = await connectToDatabase();
        const collection = db.collection("Users");

        const result = await collection.updateOne(
            { _id: new ObjectId(id) }, // Match user by ObjectId
            { $set: { submit: false } } // Set submit to false
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, message: "KYC application rejected." });
    } catch (error) {
        console.error("Error rejecting KYC application:", error);
        res.status(500).json({ success: false, message: "Internal Server Error. Could not reject the KYC application." });
    }
});

export default router;
