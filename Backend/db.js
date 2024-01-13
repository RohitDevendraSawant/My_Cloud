const mongoose = require('mongoose');

const connnectToMongo = ()=>{
    mongoose.connect(url);
}

module.exports = connnectToMongo;