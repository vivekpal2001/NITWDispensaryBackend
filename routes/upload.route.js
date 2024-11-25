const express = require('express');
const { upload, uploadFile } = require('../controllers/upload.controller'); // Import controller methods


module.exports=(app)=>{
app.post("/admin/upload",upload.single('file'), uploadFile);
}

