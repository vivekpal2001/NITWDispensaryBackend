const multer = require('multer');
const cloudinary = require('../cloudinaryConfig');
const appointmentModel = require('../models/appointment.model'); // Adjust the path if necessary

// Set up multer storage in memory (as we are directly uploading to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to handle file uploads
const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    console.log('File:', file); // Check file object
    console.log('Body:', req.body); // Check req.body
    console.log('Index:', req.body.contactIndex);

    // Check if the file exists in the request
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Use Cloudinary uploader stream to upload image files
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' }, // Set resource_type to image
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: 'Upload to Cloudinary failed' });
        }

        // Find the appointment by ID in the request
        const appointment = await appointmentModel.findById(req.body.contactIndex);
        console.log('Appointment:', appointment);

        if (!appointment) {
          return res.status(404).json({ error: 'Appointment not found' });
        }

        // Determine which field to update (prescription, report, or bill)
        const updateField = req.body.type.toLowerCase();
        if (['prescription', 'report', 'bill'].includes(updateField)) {
          appointment[updateField] = result.secure_url; // Store Cloudinary URL
          await appointment.save(); // Save the appointment with the updated field
          return res.status(200).json({ message: `${req.body.type} uploaded successfully!`, url: result.secure_url });
        } else {
          return res.status(400).json({ error: 'Invalid file type' });
        }
      }
    );

    // Pipe the file buffer to the upload stream and handle the upload process
    uploadStream.end(file.buffer);
  } catch (error) {
    console.error('Error during file upload:', error);
    return res.status(500).json({ error: 'An error occurred during the upload process' });
  }
};

module.exports = { upload, uploadFile };
