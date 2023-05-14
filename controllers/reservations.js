const { handleHttpError } = require('../utils/handleErrors');
const { reservationModel, parkingModel, usersModel } = require('../models');

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
    try {
      const reservations = await reservationModel.find({ userId: req.params.id }).exec();
  
      if (!reservations) {
        throw new Error('No reservations found for the user');
      }
  
      const parkingIds = Array.from(new Set(reservations.map(reservation => reservation.parkingId)));
  
      const [parkingResults, user] = await Promise.all([
        parkingModel.find({ _id: { $in: parkingIds } }).exec(),
        usersModel.findOne({ _id: req.params.id }).exec()
      ]);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const data = reservations.map(reservation => {
        const parkingResult = parkingResults.find(parking => parking._id.equals(reservation.parkingId));
        const parkingName = parkingResult ? parkingResult.name : 'Estacionamiento desconocido';
        const parkingLocation = parkingResult ? parkingResult.location : 'Dirección desconocida';
        return {
          ...reservation.toObject(),
          parkingName,
          location: parkingLocation,
          userName: user.firstName + ' ' + user.lastName
        };
      });
      res.send({ data });
    } catch (e) {
      console.error(e);
      handleHttpError(res, 'ERROR_GET_RESERVATIONS', 500);
    }
};  

const createReservation = async (req, res) => {
    try{
        const data = await reservationModel.create(req.body);
        res.send({data});
    } catch(e){
        handleHttpError(res, 'ERROR_CREATE_RESERVATION', 500);
    }
}

module.exports = { getReservations, createReservation, getReservationsByUserId };