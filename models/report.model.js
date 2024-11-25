// models/User.js
const mongoose = require('mongoose');


const reportSchema = new mongoose.Schema({
    patientemail:{type:String},
   type:{type:String},
   date:{type:Date},
   doctor:{type:String},
   reporturl:{type:String}
    
});


module.exports = mongoose.model('Report', reportSchema);
