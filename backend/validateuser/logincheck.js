import express from 'express';
import connectToDatabase from "../database.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

const JWT_SECRET_KEY = 'secretkey'; 

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const collection = db.collection("Users");
        const existingUser  = await collection.findOne({ email });

        if (!existingUser ) {
            return res.status(400).json({ success: false, message: 'Email or password is wrong' });
        }

        if (existingUser .password !== password) {
            return res.status(400).json({ success: false, message: 'Email or password is wrong' });
        } 
       
        const token = jwt.sign(

            { email: existingUser.email, role: existingUser.role, name:existingUser.name, country:existingUser.country, nid:existingUser.nid, img:existingUser.img, verified: existingUser.verified, submit:existingUser.submit},  // Payload (user info)
            JWT_SECRET_KEY,  // Secret key
            { expiresIn: '1h' }  // Token expiration time (1 hour)

        );

           
       

        res.status(200).json({ success: true, message: 'User  found', role: existingUser .role ,token: token});
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;

