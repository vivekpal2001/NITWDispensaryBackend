// controllers/appointmentController.js
const Appointment = require("../models/appointment.model");

exports.bookAppointment = async (req, res) => {
    const { date, time, doctor, specialty, patientName, patientAge, patientSex, email } = req.body;

    try {
        // Check if the time slot is already booked for the given date and doctor
        const existingAppointment = await Appointment.findOne({ date, time, doctor });

        if (existingAppointment) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        // Create a new appointment
        const appointment = new Appointment({
            email,
            doctor,
            specialty,
            date,
            time,
            patientName,
            patientAge,
            patientSex
        });

        await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment', error });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        // Access email from query parameters
        const { email } = req.query;
        // Log the email for debugging
        // console.log('Fetching appointments for email:', email);

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Retrieve all appointments for the signed-in patient by email
        const appointments = await Appointment.find({ email });

        // Log the appointments for debugging
        // console.log('Appointments found:', appointments);

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error retrieving appointments:', error);
        res.status(500).json({ message: 'Error retrieving appointments', error });
    }
};

exports.admingetAll = async (req, res) => {
    try {
        
        // Retrieve all appointments for the signed-in patient by email
        const appointments = await Appointment.find();

        // Log the appointments for debugging
        // console.log('Appointments found:', appointments);

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error retrieving appointments:', error);
        res.status(500).json({ message: 'Error retrieving appointments', error });
    }
};

exports.confirmAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
       
        await Appointment.findByIdAndUpdate(appointmentId, { status: 'completed' });
        res.status(200).json({ message: 'Appointment confirmed!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to confirm appointment' });
    }
};

// Cancel appointment
exports.cancelAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        await Appointment.findByIdAndUpdate(appointmentId, { status: 'cancelled' });
        res.status(200).json({ message: 'Appointment cancelled!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to cancel appointment' });
    }
};

// Reschedule appointment
exports.rescheduleAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const { newDate } = req.body; // Get the new date from the request
        await Appointment.findByIdAndUpdate(appointmentId, { date: newDate });
        res.status(200).json({ message: 'Appointment rescheduled!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reschedule appointment' });
    }};


    exports.deleteData = async (req, res) => {
        try {
            const appointmentId = req.params.id;
    
            // Validate appointmentId
            if (!appointmentId) {
                return res.status(400).json({ error: 'Appointment ID is required' });
            }
    
            // Attempt to delete the appointment
            const result = await Appointment.findByIdAndDelete(appointmentId);
    
            // Check if the appointment was found and deleted
            if (!result) {
                return res.status(404).json({ error: 'Appointment not found' });
            }
    
            res.status(200).json({ message: 'Appointment deleted successfully' });
        } catch (error) {
            console.error('Error deleting appointment:', error);
            res.status(500).json({ error: 'Failed to delete appointment' });
        }
    };
    