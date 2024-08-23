const mongoose = require("mongoose");
require("dotenv").config();
exports.dbConnect = async() => {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(console.log("Database connected"))
    .catch((error)=>{
        console.log("Error in connecting the databse");
        console.error(error);
    })
}