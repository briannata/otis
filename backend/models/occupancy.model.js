const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const occupancySchema = new Schema({
    location: {type: String, required: true},
    occupancy: {type: Number, required: true},
    max_occupancy: {type: Number, required: true},
}, {
    timestamps: true,
});

const Occupancy = mongoose.model('Occupancy', occupancySchema);
module.exports = Occupancy;