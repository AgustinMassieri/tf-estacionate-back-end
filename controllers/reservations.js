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

const createReservation = async (req, res) => {
    console.log(req.body)
    try{
        const data = await reservationModel.create(req.body);
        res.send({data});
    } catch(e){
        console.log(e)
        handleHttpError(res, 'ERROR_CREATE_RESERVATION', 500);
    }
}

module.exports = { getReservations, createReservation };