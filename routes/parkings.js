const express = require('express');
const router = express.Router();
const { getParkings, getParking, createParking, updateParking, deleteParking } = require('../controllers/parkings');
const { validatorCreateParking, validatorGetParking } = require('../validators/parkings');
const authMiddleware = require('../middleware/sessionMiddleware');
const checkRol = require('../middleware/role');

router.get("/", authMiddleware, getParkings);
router.get("/:id", authMiddleware, validatorGetParking, getParking);
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateParking, createParking);
router.put("/:id", authMiddleware, updateParking);
router.delete("/:id", authMiddleware, deleteParking);

module.exports = router;