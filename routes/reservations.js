const express = require('express');
const router = express.Router();
const { getReservations, createReservation } = require('../controllers/reservations');

const checkRol = require('../middleware/role');

router.get("/",  getReservations);
router.post("/", createReservation);

module.exports = router;