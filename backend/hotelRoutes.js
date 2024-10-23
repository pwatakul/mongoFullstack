const express = require('express');
const router = express.Router();
const Hotel = require('./hotel');
const Booking = require('./booking');
const Client = require('./client');
const mongoose = require('mongoose');

// GET all items
router.get('/', async (req, res) => {

  const { location, type, numOfBedrooms } = req.query;

  const query = {};

  if (location) query['address.market'] = { $regex: location, $options: 'i' }; // Case-insensitive search
  if (type) query.property_type = { $regex: new RegExp(`^${type}$`, 'i') }; // Case-insensitive exact match
  if (numOfBedrooms) query.bedrooms = { $eq: parseInt(numOfBedrooms) }; // Search for hotels with >= numOfBedrooms
  
  
  try {
    
    const hotels = await Hotel.find(query).select('id name address market property_type bedrooms description').limit(10).lean();

    res.json(hotels);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific hotel
router.get('/:id', async (req, res) => {
  try {  
    const id = req.params.id;

    const hotel = await Hotel.findById(id).lean();


    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

// POST a new item
router.post('/:id', async (req, res) => {
  
  let client = await Client.findOne({ email: req.body.email });
  
  if (!client) {
    client = new Client({
      name: req.body.name,
      emailAddress: req.body.email,
      daytimePhoneNumber: req.body.mobileNumber,
      mobileNumber: req.body.mobileNumber,
      postalAddress: req.body.postalAddress,
      homeAddress: req.body.residentialAddress
    });

    try {
      client = await client.save();
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  const newBooking = new Booking({
    hotel_id: req.params.id,
    client_id: client._id,
    arrivalDate: req.body.checkin,
    departureDate: req.body.checkout,
    depositPaid: 0,
    balanceDue: 0,
    balanceDueDate: null,
    numberOfGuest: 0,
    guest: [],
  });

  // Generate a unique booking ID
  const bookingId = new mongoose.Types.ObjectId();
  newBooking.bookingId = bookingId;

  try {
    const savedBooking = await newBooking.save();
    client.bookings.push(savedBooking._id);
    await client.save();
    res.status(201).json({
      data: savedBooking
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;