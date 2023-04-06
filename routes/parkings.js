const express = require('express');
const router = express.Router();
const { getParkings, getParking, createParking, updateParking, deleteParking } = require('../controllers/parkings');
const { validatorCreateParking } = require('../validators/users');

router.get("/", getParkings);
router.get("/:id", getParking);
router.post("/", validatorCreateParking, createParking);
router.put("/:id", updateParking);
router.delete("/:id", deleteParking);

module.exports = router;