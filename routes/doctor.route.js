// routes/appointmentRoutes.js

const appointmentController=require("../controllers/appointment.controller")
const doctorController=require("../controllers/doctor.controller")

module.exports=(app)=>{
    app.get("/doctor/getappointments/:name",appointmentController.getappointments);
    app.post("/doctor/signin",doctorController.signindr)
    }