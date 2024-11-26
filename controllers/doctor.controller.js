
const doctor_model=require("../models/doctor.model")

exports.signindr=async(req,res)=>{

    //get details from body
    const getUser=await doctor_model.findOne({email:req.body.email})    

    //find if user is present
    if(getUser==null){
        return res.status(400).send({
            message:"Email is not valid"
        })
    }

    //verify the password

    if(req.body.password===getUser.password){
        res.status(200).send({
            name:getUser.name,
            email:getUser.email,
            id:getUser._id
        })
    }else{
        return res.status(401).send({
            message:"Password not valid"
        })
    }

}