const { parkingModel } = require('../models');
const { handleHttpError } = require('../utils/handleErrors');
const { reservationModel } = require('../models');


const getParkings = async (req, res) => {
    try{
        const user = req.user;
        const data = await parkingModel.find({});
        res.send({ data, user });        
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
        const data = await parkingModel.create(req.body);
        res.send({data});
    } catch(e){
        handleHttpError(res, 'ERROR_CREATE_PARKING', 500);
    }
}

const updateParking = async (req, res) => {
    try{
        const data = await parkingModel.findByIdAndUpdate(
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

const getParkingsWithAvailabiltyByDate = async (req, res) => {
    try {
        // Obtén todas las reservas para la fecha especificada
        const reservations = await reservationModel.find({ date: req.params.fecha, status: 'Registrada' });

        // Obtén todos los parkings
        const parkings = await parkingModel.find();

        // Itera sobre cada parking y realiza la resta
        parkings.map((parking) => {
            const matchingReservations = reservations.filter(
                (reservation) => reservation.parkingId === parking._id.toString()
            );
            const reservedSpaces = matchingReservations.length;
            const availableSpaces = parking.numberOfParkingSpacesAvailable - reservedSpaces;
            parking.numberOfParkingSpacesAvailable = availableSpaces;
        });
        res.send({parkings});

    } catch (error) {
        console.error('Error al obtener la disponibilidad del parking:', error);
        throw error;
    }
}

const addRateToParking = async (req, res) => {
    try {
      const data = await parkingModel.findById(req.params.id);
      
      if (!data) {
        return handleHttpError(res, 'ERROR_PARKING_NOT_FOUND', 404);
      }

      if (!Array.isArray(data.rating)) {
        data.rating = [];
      }
  
      data.rating.push(req.body.rate);
  
      await data.save();
  
      res.send({ data });
    } catch (e) {
      handleHttpError(res, 'ERROR_ADD_RATE', 500);
    }
}

module.exports = { getParkings, getParking, createParking, updateParking, deleteParking, getParkingsWithAvailabiltyByDate, addRateToParking };