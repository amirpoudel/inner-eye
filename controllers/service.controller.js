const {Service} = require('../models/service.model');
const { errorHandler } = require('../utils/errorHandler');

const createService = async (req,res) => {
    
    const {title,description} = req.body;
    
    try {
        const service = await Service.create({title,description});
        res.status(201).json({
            message: 'Service created successfully',
            data : service,
            success: true,
            statusCode: 201,
        });
    } catch (error) {
        errorHandler(error,res)
    }
}

const getServices = async (req,res) => {
   try {
    const services = await Service.find();
    if(!services){
        return res.status(404).json({
            message: 'No services found',
            success: false,
            statusCode: 404,
        });
    }
    return res.status(200).json({
        message: 'Services retrieved successfully',
        data: services,
        success: true,
        statusCode: 200,
    });
   } catch (error) {
    errorHandler(error,res);
   }
}



const updateService = async (req,res) => {
    const {id} = req.params;
    const {title,description} = req.body;
    try {
        const service = await Service.findByIdAndUpdate (id,{title,description},{new:true});
        return res.status(200).json({
            message: 'Service updated successfully',
            data: service,
            success: true,
            statusCode: 200,
        });
    } catch (error) {
        errorHandler(error,res);
    }
}

const deleteService = async (req,res) => {
    const {id} = req.params;
    try {
        const deletedService = await Service.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Service deleted successfully',
            data: deletedService,
            success: true,
            statusCode: 200,
        });
        
    } catch (error) {
        errorHandler(error,res);
    }
}


module.exports = {
    createService,
    getServices,
    updateService,
    deleteService
}