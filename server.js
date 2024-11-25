const express=require("express")
const mongoose=require("mongoose")
const app=express()
const cors=require("cors")
require('dotenv').config()


//fors cors
const corsOptions = {
    origin: '*',  // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));
  
app.use(express.json())





//for database conection
mongoose.connect(process.env.MONGO_URI)

const db=mongoose.connection

db.on("error",()=>{
    console.log("Error while connecting to Database")
})

db.once("open",()=>{
    console.log("Successfull connecting the database")
})



//stitch 
require("./routes/patient.routes")(app);
require("./routes/appointment.route")(app);
require("./routes/upload.route")(app);

app.listen(process.env.PORT,()=>{
    console.log("Server started at port",process.env.PORT)
})



