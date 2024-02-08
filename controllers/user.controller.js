const {User} = require('../models/user.model');
const {errorHandler} = require('../utils/errorHandler');
const bcrypt = require("bcrypt");

const saltRounds = 10;

const registerUser = async(req,res)=>{
    /**
     * hash password using bcrypt
     * 
     */

    const {name,email,phoneNumber,password} = req.body;

    //encrypt password
    const hashPassword = await bcrypt.hash(password,saltRounds);

    try {
        const user = await User.create({
            name,
            email,
            phoneNumber,
            password:hashPassword
        })
    
        return res.status(201).json({
            statusCode:201,
            message:"User created successfully",
            data : user,
            success:true
        })
    } catch (error) {
        errorHandler(error,res)
    }

}

const loginUser = async (req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).json({
                statusCode:404,
                message:"User not found",
                success:false
            })
        }

        //compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                statusCode:401,
                message:"Invalid password",
                success:false
            })
        }

        return res.status(200).json({
            statusCode:200,
            message:"User logged in successfully",
            success:true
        })
    } catch (error) {
        
    }
}




module.exports = {
    registerUser,
    loginUser  
}