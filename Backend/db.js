const mongoose = require('mongoose');

const connnectToMongo = ()=>{
    // Change url in .env file as per your database
    mongoose.connect(url);
}

module.exports = connnectToMongo;