const {Blog} = require('../models/blog.model')
const {errorHandler} = require('../utils/errorHandler')
const fs = require('fs')


const createBlog = async (req,res) => {
    const {title,content,author} = req.body;
    let image = req.files.image[0].path;
    let authorImage = req.files.authorImage[0].path;
    try {
        const blog = await Blog.create({title,content,image,author,authorImage});
        res.status(201).json({
            message: 'Blog created successfully',
            data : blog,
            success: true,
            statusCode: 201,
        });
    } catch (error) {
        errorHandler(error,res)
    }
}


const getBlog = async (req,res)=>{
    try {
        const blog = await Blog.find();

        return res.status(200).json({
            message: 'Blog fetched successfully',
            data : blog,
            success: true,
            statusCode: 200,
        });


    } catch (error) {
       return  errorHandler(error,res)
    }   
}

const updateBlog = async (req,res)=>{

    const {blogId} = req.params;
    const {title,content,author} = req.body;

    try {
        const newBLog = await Blog.findByIdAndUpdate(blogId,{
            title,
            content,
            author
        },{new:true})   
        
        res.status(200).json({
            message: 'Blog updated successfully',
            data : newBLog,
            success: true,
            statusCode: 200,
        });
    } catch (error) {
        return errorHandler(error,res);
    }

}

const updateBlogImage = async (req,res)=>{
    const {blogId} = req.params;

    let image = req?.files?.image?.[0]?.path;
    let authorImage = req?.files?.authorImage?.[0]?.path;

    try {
        //Extract old image and author image link
        const oldBlog = await Blog.findById(blogId);
        if(!oldBlog){
            return res.status(404).json({
                message: 'Blog not found',
                success: false,
                statusCode: 404,
            });
        }
        const oldImage = oldBlog?.image;
        const oldAuthorImage = oldBlog?.authorImage;
        //after extracting update the image and author image in blog
        const newBlog = await Blog.findByIdAndUpdate(blogId,{
            image,
            authorImage
        },{new:true})
        // node delete the blog
        
        // image , author image 
        if(oldImage && image){
            //delete the old image
            fs.unlinkSync(oldImage)
            console.log('old image deleted',oldImage)

        }
        if(authorImage && oldAuthorImage){
            // delet the old author image
            fs.unlinkSync(oldAuthorImage)
            console.log('old author image deleted',oldAuthorImage)
        }
        
        return res.status(200).json({
            message: 'Blog image updated successfully',
            data : newBlog,
            success: true,
            statusCode: 200,
        });
    } catch (error) {
        errorHandler(error,res)
    }


}




module.exports = {
    createBlog,
    getBlog,
    updateBlog,
    updateBlogImage
}