// models/User.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileurl:{type:String},
    password: { type: String, required: true },
    // role: { type: String, enum: ['Patient', 'Admin'], required: true },
});


module.exports = mongoose.model('Doctor', doctorSchema);
