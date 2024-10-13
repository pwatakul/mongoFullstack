const express = require('express');
const router = express.Router();
const Hotel = require('./hotel');
const mongoose = require('mongoose');

// GET all items
router.get('/', async (req, res) => {

  const { location, type, numOfBedrooms } = req.query;

  const query = {};

  if (location) query['address.market'] = { $regex: location, $options: 'i' }; // Case-insensitive search
  if (type) query.property_type = { $regex: new RegExp(`^${type}$`, 'i') }; // Case-insensitive exact match
  if (numOfBedrooms) query.bedrooms = { $eq: parseInt(numOfBedrooms) }; // Search for hotels with >= numOfBedrooms
  
  
  try {
    const hotels = await Hotel.find(query).select('id name address market property_type bedrooms').limit(10).lean();

    res.json(hotels);

    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific hotel
router.get('/:id', async (req, res) => {
  // try {  
    const id = req.params.id;

    console.log(id);
    // const ObjectId = mongoose.Types.ObjectId;
    // const query = { '_id': new ObjectId(id) };
    
    // let hotel = await Hotel.findOne(query).select('id name address market property_type bedrooms').lean();
    
    // console.log(query);

    res.json([]);
  // } catch (err) {
  //   res.status(404).json({ message: 'Hotel not found' });
  // }

});

// POST a new item
// router.post('/', async (req, res) => {
//   const newItem = new Item({
//     name: req.body.name
//   });

//   try {
//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

module.exports = router;