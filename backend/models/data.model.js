const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    phone: {type: Number, required: true},
    num_of_people: {type: Number, required: true},
    stay_length: {type: Number, required: true},
    wheelchair: {type: Boolean, required: true},
    childsupport: {type: Boolean, required: true},
}, {
    timestamps: true,
});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;