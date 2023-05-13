const { handleHttpError } = require('../utils/handleErrors');
const { reservationModel } = require('../models');

const getReservations = async (req, res) => {
    try{
        const user = req.user;
        const data = await reservationModel.find({});
        res.send({ data, user });        
    } catch(e){
        handleHttpError(res, 'ERROR_GET_RESERVATIONS', 500);
    }
}

const getReservationsByUserId = async (req, res) => {
    try{
        const user = req.user;
        const data = await reservationModel.find({userId: req.params.id});
        res.send({ data, user });        
    } catch(e){
        handleHttpError(res, 'ERROR_GET_RESERVATIONS', 500);
    }
}

const createReservation = async (req, res) => {
    try{
        const data = await reservationModel.create(req.body);
        res.send({data});
    } catch(e){
        handleHttpError(res, 'ERROR_CREATE_RESERVATION', 500);
    }
}

module.exports = { getReservations, createReservation, getReservationsByUserId };