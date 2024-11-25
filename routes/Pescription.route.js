// routes/prescriptionRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createPrescription } = require('../controllers/prescriptionController');

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/upload', upload.single('prescription'), createPrescription);

module.exports = router;
