const {Service} = require('../models/service.model');

const createService = async (req,res) => {
    const {title,description} = req.body;
    try {
        const service = Service.create({title,description});
        res.status(201).json({service});
    } catch (error) {
        res.status(400).json({error});
    }
}

const getServices = async (req,res) => {
    try {
        const services = await Service.find({});
        res.status(200).json({services});
    } catch (error) {
        //write error to log file
        res.status(400).json({error});
    }
}

const updateService = async (req,res) => {
    const {id} = req.params;
    const {title,description} = req.body;
    try {
        const service = await Service.findByIdAndUpdate (id,{title,description},{new:true});
        res.status(200).json({service});
    } catch (error) {
        res.status(400).json({error});
    }
}

const deleteService = async (req,res) => {
    const {id} = req.params;
    try {
        await Service.findByIdAndDelete(id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({error});
    }
}