
import connectToDatabase from '../database.js';
import express from 'express';

const router = express.Router();


router.get('/brands', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const newCarsCollection = db.collection('New_cars');
        const usedCarsCollection = db.collection('Used_cars');

        const newBrands = await newCarsCollection.distinct('brand');
        const usedBrands = await usedCarsCollection.distinct('brand');

        const combinedBrands = [...new Set([...newBrands, ...usedBrands])];

        res.json({ success: true, brands: combinedBrands });
    } catch (error) {
        console.error('Error fetching brands:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/models', async (req, res) => {
    const brand = req.query.brand;

    if (!brand) {
        return res.status(400).json({ success: false, message: 'Brand is required' });
    }

    try {
        const db = await connectToDatabase();
        const newCarsCollection = db.collection('New_cars');
        const usedCarsCollection = db.collection('Used_cars');

        const newModels = await newCarsCollection.distinct('model', { brand });
        const usedModels = await usedCarsCollection.distinct('model', { brand });

        const combinedModels = [...new Set([...newModels, ...usedModels])];

        res.json({ success: true, models: combinedModels });
    } catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/conditions', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const newCarsCollection = db.collection('New_cars');
        const usedCarsCollection = db.collection('Used_cars');

        
        const newConditions = await newCarsCollection.distinct('label');
        const usedConditions = await usedCarsCollection.distinct('label');

        const combinedConditions = [...new Set([...newConditions, ...usedConditions])];

        res.json({ success: true, conditions: combinedConditions });
    } catch (error) {
        console.error('Error fetching conditions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/city', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const newCarsCollection = db.collection('New_cars');
        const usedCarsCollection = db.collection('Used_cars');

        const newLocation = await newCarsCollection.distinct('purchase_location');
        const usedLocation = await usedCarsCollection.distinct('purchase_location');

        const combinedLocation = [...new Set([...newLocation, ...usedLocation])];

        res.json({ success: true, brands: combinedLocation });
    } catch (error) {
        console.error('Error fetching brands:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



export default router;