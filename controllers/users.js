const { matchedData } = require('express-validator');
const {usersModel} = require('../models');
const { handleHttpError } = require('../utils/handleErrors');

const getUsers = async (req, res) => {
    try{
        const data = await usersModel.find({});
        res.send({data});        
    } catch(e){
        handleHttpError(res, 'ERROR_GET_USERS', 500);
    }
}

const getUser = async (req, res) => {
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await usersModel.findById(id);
        res.send({data});    

    } catch(e){
        handleHttpError(res, 'ERROR_GET_USER', 500);
    }
}

const createUser = async (req, res) => {
    try{
        const body = matchedData(req)
        const data = await usersModel.create(body);
        res.send({data});
    } catch(e){
        handleHttpError(res, 'ERROR_CREATE_USER', 500);
    }
}

const updateUser = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req);
        const data = await usersModel.findOneAndUpdate(
            id, body
        );
        res.send({data});
    } catch(e){
        handleHttpError(res, 'ERROR_UPDATE_USER', 500);
    }
}

const deleteUser = async (req, res) => {
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await usersModel.delete({_id:id});;
        res.send({data});
    } catch(e){
        handleHttpError(res, 'ERROR_DELETE_USER', 500);
    }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };