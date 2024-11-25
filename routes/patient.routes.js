const authController=require("../controllers/auth.controller")
module.exports=(app)=>{
app.post("/patient/signup",authController.signup);
app.post("/patient/signin",authController.signin);
}