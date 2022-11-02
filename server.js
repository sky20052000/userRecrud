const config = require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/userRoutes")

// configauration
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// db connection
mongoose.connect(config.Mongo_Url).then((data)=>{
    console.log("Mongoose connected to db");
}).catch((err)=>{
    console.log("No database connection",err);
});

// set Route 
app.use("/api/user", userRoute)

app.listen(config.PORT,()=>{
   console.log(`server listening on the:${config.HOST}:${config.PORT}`);
});