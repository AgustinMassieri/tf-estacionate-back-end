const express = require('express');
const router = express.Router();
const { getReservations, createReservation } = require('../controllers/reservations');

const checkRol = require('../middleware/role');

router.get("/",  getReservations);
router.post("/", checkRol(["admin", "user"]), createReservation);

module.exports = router;