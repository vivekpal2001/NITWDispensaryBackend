// routes/appointmentRoutes.js

const doctorController=require("../controllers/appointment.controller")

module.exports=(app)=>{
    app.get("/doctor/getappointments/:name",doctorController.getappointments);
    }