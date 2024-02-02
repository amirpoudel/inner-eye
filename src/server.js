const dotenv  = require('dotenv');
dotenv.config();

const express = require('express');
const connectMongodb = require("../dbConfig/mongodb.config")
const app = express();
const port = 8000;

connectMongodb();



app.listen(port, () => {
    console.log(`Server start on port ${port}`)
})
