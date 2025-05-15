import connectToDatabase from '../database.js';
import express from 'express';

const router = express.Router();

router.get('/cars', async (req, res) => {
    const query = req.query.q?.toLowerCase(); 

    if (!query) {
        return res.json([]); 
    }

    try {
        const db = await connectToDatabase(); 
        

        const newCarsCollection = db.collection('New_cars');
        const usedCarsCollection = db.collection('Used_cars');

        const newCarsData = await newCarsCollection.find({
            brand: { $regex: query, $options: 'i' }  
        }).toArray();

        const usedCarsData = await usedCarsCollection.find({
            brand: { $regex: query, $options: 'i' }  
        }).toArray();

        const combinedData = [...newCarsData, ...usedCarsData];

        res.json(combinedData);
        
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;