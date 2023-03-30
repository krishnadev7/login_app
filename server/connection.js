const mongoose = require('mongoose');

const mongoConnection = async() => {
    try {
        await mongoose.connect(process.env.mongo_uri) 
        console.log("mongodb connected");       
    } catch (error) {
        throw error
    }
}

module.exports = mongoConnection