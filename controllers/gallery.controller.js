const {Gallery} = require('../models/gallery.model');


const createGallery = async (req,res)=>{
    
    
    let imageLink = req.files.map(file=>file.path);
    console.log(imageLink);

   
    try {
        const galleryResponse = await Gallery.create({
            imageLink
        })
    } catch (error) {
        
    }
    return;
}


module.exports = {
    createGallery
}