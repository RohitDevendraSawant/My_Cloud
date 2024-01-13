const mongoose = require('mongoose');
require("dotenv").config();

const connnectToMongo = ()=>{
    // Change url in .env file as per your database
    const url = process.env.URL;
    mongoose.connect(url);
}

module.exports = connnectToMongo;