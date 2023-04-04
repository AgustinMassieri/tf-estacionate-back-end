const express = require('express');
const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/users');
const router = express.Router();
const { validatorCreateUser, validatorGetUser } = require('../validators/users');

router.get("/", getUsers);
router.get("/:id", validatorGetUser, getUser);
router.post("/", validatorCreateUser, createUser);
router.put("/:id", validatorGetUser, validatorCreateUser, updateUser);
router.delete("/:id", validatorGetUser, deleteUser);

module.exports = router;