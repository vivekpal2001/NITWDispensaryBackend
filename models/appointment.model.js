const mongoose = require('mongoose');

// Define the schema for the appointment
const appointmentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    patientSex: {
        type: String,
        required: true
    },
    prescription: {
        type: String, // URL or file path to the prescription
        default: null
    },
    report: {
        type: String, // URL or file path to the medical report
        default: null
    },
    bill: {
        type: String, // URL or file path to the bill
        default: null
    },
    status:{
        type:String,
        enum:["waiting","completed","cancelled"],
        default:"waiting",

    }
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
