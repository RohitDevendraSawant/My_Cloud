const mongoose = require('mongoose');
require("dotenv").config();

const connnectToMongo = ()=>{
    const url = process.env.URL;
    mongoose.connect(url);
}

module.exports = connnectToMongo;