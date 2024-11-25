// controllers/prescriptionController.js
const Prescription = require('../models/Prescription');
const cloudinary = require('../config/cloudinaryConfig');

exports.createPrescription = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'auto',
            folder: 'prescriptions',
        });

        const prescription = new Prescription({
            patient: req.body.patientId,
            doctor: req.body.doctor,
            prescriptionPDF: result.secure_url,
        });

        await prescription.save();
        res.status(201).json({ message: 'Prescription uploaded successfully', prescription });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload prescription' });
    }
};
