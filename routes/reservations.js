const express = require('express');
const router = express.Router();
const { getReservations, createReservation, getReservationsByUserId, cancelReservation } = require('../controllers/reservations');

const checkRol = require('../middleware/role');

router.get("/",  getReservations);
router.get("/:id",  getReservationsByUserId);
router.post("/", createReservation);    
router.put("/:id", cancelReservation);

module.exports = router;