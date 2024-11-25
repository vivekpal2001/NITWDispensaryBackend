// routes/appointmentRoutes.js

const appointmentController=require("../controllers/appointment.controller")

module.exports=(app)=>{
    app.post("/patient/appointments",appointmentController.bookAppointment);
    app.get("/patient/getallappointments",appointmentController.getAllAppointments);
    app.get("/admin/getAll",appointmentController.admingetAll);
    app.post('/appointments/confirm/:id', appointmentController.confirmAppointment);
app.post('/appointments/cancel/:id', appointmentController.cancelAppointment);
app.post('/appointments/reschedule/:id', appointmentController.rescheduleAppointment);
app.post("/admin/delete/:id",appointmentController.deleteData)
    }