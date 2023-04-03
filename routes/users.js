const express = require('express');
const { getUsers, createUser } = require('../controllers/users');
const router = express.Router();
const { validacionCreateUser } = require('../validators/users');

router.get("/", getUsers);
router.post("/", validacionCreateUser, createUser);

module.exports = router;