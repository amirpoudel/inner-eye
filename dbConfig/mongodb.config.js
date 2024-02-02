const mongoose = require('mongoose');

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;

async function connectMongodb(){
    try {
        console.log("Hello ",user);
        console.log("Hello ",password);
        await mongoose.connect('mongodb://localhost:27017/inner-eye');
        console.log("Database Connected")
    } catch (error) {
        console.log('Error connecting to mongodb', error);
        process.exit(1);
       
    }
}


module.exports = connectMongodb;