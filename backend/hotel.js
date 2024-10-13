const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

}, {collection: 'listingsAndReviews'});

module.exports = mongoose.model('Hotel', hotelSchema);