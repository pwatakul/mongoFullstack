const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    departureDate: {
        type: Date,
        required: true 
    },
    hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    depositPaid: {
        type: Number,
        default: 0
    },
    balanceDue: {
        type: Number,
        default: 0
    },
    balanceDueDate: {
        type: Date,
        default: null
    },
    numberOfGuest: {
        type: Number,
        default: 0
    },
    guest: {
        type: Array,
        default: []
    },
    hotel_id: {
        type: String,
        ref: 'Hotel',
        required: true
    },
}, {collection: 'bookings'});

module.exports = mongoose.model('Bookings', bookSchema);