let enquiryModel=require("../../models/enquiry.model");

let insertEnquiry=(req,res)=> {
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
    console.log("create enquiry chal gyi")
}

let viewEnquiry=async(req,res) => {
    let enquiryList=await enquiryModel.find()  // mongoose me hume data ka object array banane ki zarurat nhi padti wo apne aap karleta hai 
    res.status(200).json({status:1,message:"Enquiry List",data:enquiryList})
    console.log("view/read enquiry chalgyi")
}

let deleteEnquiry=async (req,res) => {
    let enquiryId=req.params.id
    let deleteEnquiry=await enquiryModel.deleteOne({_id:enquiryId})
    res.status(200).json({status:1,message:"Enquiry Deleted",id:enquiryId,data:deleteEnquiry})
    console.log("delete enquiry chal gyi")
}

let updateEnquiry=async(req,res)=>{
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
    console.log("update enquiry chal gyi")
}

module.exports={insertEnquiry,viewEnquiry,deleteEnquiry,updateEnquiry}