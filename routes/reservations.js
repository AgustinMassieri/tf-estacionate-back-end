const express = require('express');
const router = express.Router();
const { getReservations, createReservation, getReservationsByUserId, updateReservation } = require('../controllers/reservations');

const checkRol = require('../middleware/role');

router.get("/",  getReservations);
router.get("/:id",  getReservationsByUserId);
router.post("/", createReservation);    
router.put("/:id", updateReservation);

module.exports = router;