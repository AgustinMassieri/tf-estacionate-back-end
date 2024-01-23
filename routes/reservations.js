const express = require('express');
const router = express.Router();
const { getReservations, createReservation, getReservationsByUserId, updateReservation, getReservationCountsByMonth, getReservationsStatusCount } = require('../controllers/reservations');

const checkRol = require('../middleware/role');

router.get("/",  getReservations);
router.get("/user/:id",  getReservationsByUserId);
router.post("/", createReservation);    
router.put("/:id", updateReservation);
router.get("/chart/counts", getReservationCountsByMonth);
router.get("/chart/status", getReservationsStatusCount);

module.exports = router;