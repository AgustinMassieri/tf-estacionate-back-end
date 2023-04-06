const { matchedData } = require('express-validator');
const { parkingModel } = require('../models');
const { handleHttpError } = require('../utils/handleErrors');

const getParkings = async (req, res) => {
    try{
        const data = await parkingModel.find({});
        res.send({data});        
    } catch(e){
        handleHttpError(res, 'ERROR_GET_PARKINGS', 500);
    }
}

const getParking = async (req, res) => {
    try{
        const data = await parkingModel.findById(req.params.id);
        res.send({data});    

    } catch(e){
        handleHttpError(res, 'ERROR_GET_USER', 500);
    }
}

const createParking = async (req, res) => {
    try{
        const body = matchedData(req)
        const data = await parkingModel.create(body);
        res.send({data});
    } catch(e){
        handleHttpError(res, 'ERROR_CREATE_PARKING', 500);
    }
}

const updateParking = async (req, res) => {
    try{
        const data = await parkingModel.findOneAndUpdate(
            req.params.id, req.body
        );
        res.send({data});
    } catch(e){
        handleHttpError(res, 'ERROR_UPDATE_PARKING', 500);
    }
}

const deleteParking = async (req, res) => {
    try{
        const data = await parkingModel.delete({_id:req.params.id});;
        res.send({data});
    } catch(e){
        handleHttpError(res, 'ERROR_DELETE_PARKING', 500);
    }
}

module.exports = { getParkings, getParking, createParking, updateParking, deleteParking };