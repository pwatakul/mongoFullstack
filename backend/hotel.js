const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: true
  },

}, {collection: 'listingsAndReviews'});

module.exports = mongoose.model('Hotel', hotelSchema);