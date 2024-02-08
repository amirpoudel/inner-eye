const dotenv  = require('dotenv');
dotenv.config();

const express = require('express');
const connectMongodb = require("../dbConfig/mongodb.config")
const app = express();
const port = 8000;

connectMongodb();

//parse json format
app.use(express.json());

// routes
const serviceRoutes = require('../routes/serviceRoutes/service.route');
const blogRoutes = require('../routes/blogRoutes/blog.route');
const galleryRoutes = require('../routes/galleryRoutes/gallery.route')
const userRoutes = require('../routes/userRoutes/user.route');


app.use("/service",serviceRoutes)
app.use("/blog",blogRoutes)
app.use("/gallery",galleryRoutes)
app.use("/user",userRoutes)


app.listen(port, () => {
    console.log(`Server start on port ${port}`)
})
