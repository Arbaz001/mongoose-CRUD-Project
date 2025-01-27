let express=require("express");
let mongoose=require("mongoose");

const enquiryRoutes = require("./App/routes/web/enquiryRoutes");

require('dotenv').config();

let app=express()

app.use(express.json())

app.use("/web/api/enquiry",enquiryRoutes)

//conect to mongodb use mongoose
mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT,() => {
        console.log("Server is Running on port "+process.env.PORT);
    })
})



