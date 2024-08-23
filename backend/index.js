const express = require("express");
const {dbConnect} = require("./config/database");
require("dotenv").config();
const routes = require("./routes/bookRoute");
const cors = require("cors")


// intialising the app
const app = express();

// middleware
app.use(express.json());        // body-parser

// middleware for handling the cors policy
// option 1: Allow all Origins with Default of cors(*)
app.use(cors());
// option 2: Allow Custom Origins
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))



// function call for connecting the database
dbConnect();

// port extraction from env file 
const port = process.env.PORT;

// mounting routes
app.use("/books",routes);

// default page
app.get("/",(request,response)=>{
    // console.log(request);
    return response.status(234).send("Welcome to the project");
})


// app listening 
app.listen(port,()=>{
    console.log(`App is running at ${port}`);
})