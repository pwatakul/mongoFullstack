const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    emailAddress: { type: String, required: true },
    daytimePhoneNumber: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    postalAddress: { type: String, required: true },
    homeAddress: { type: String, required: true },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
}, { collection: 'clients' });

module.exports = mongoose.model('Client', clientSchema);