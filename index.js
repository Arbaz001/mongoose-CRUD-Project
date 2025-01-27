let express=require("express");
let mongoose=require("mongoose");
let enquiryModel=require("./models/enquiry.model")

require('dotenv').config();

let app=express()

app.use(express.json())

app.post('/api/enquiry-insert',(req,res)=> {
    let {sName,sEmail,sPhone,sMessage}=req.body
    
    let enquiry=new enquiryModel({
        name:sName,
        email:sEmail,
        phone:sPhone,
        message:sMessage
    })
    enquiry.save().then(() => {
        res.send({status:1,message:"Enquiry Saved Succesfully"})
    }).catch((err) => {
        res.send({status:0,message:"Error while saving Enquiry",error:err})
    })
})

app.get("/api/enquiry-list",async(req,res) => {
    let enquiryList=await enquiryModel.find()  // mongoose me hume data ka object array banane ki zarurat nhi padti wo apne aap karleta hai 
    res.status(200).json({status:1,message:"Enquiry List",data:enquiryList})
})

app.delete("/api/enquiry-delete/:id",async (req,res) => {
    let enquiryId=req.params.id
    let deleteEnquiry=await enquiryModel.deleteOne({_id:enquiryId})
    res.status(200).json({status:1,message:"Enquiry Deleted",id:enquiryId,data:deleteEnquiry})
})

app.put("/api/enquiry-update/:id",async(req,res)=>{
    let updateId=req.params.id
    let {sName,sEmail,sPhone,sMessage}=req.body
    let updateobj={
        name:sName,
        email:sEmail,
        phone:sPhone,
        message:sMessage
    }
    let updatingEnquiry=await enquiryModel.updateOne({_id:updateId},updateobj)
    res.status(200).json({status:1,message:"Enquiry updated",id:updateId,data:updatingEnquiry})
})


//conect to mongodb use mongoose
mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT,() => {
        console.log("Server is Running on port "+process.env.PORT);
    })
})



