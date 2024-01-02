const express = require('express');
const router = express.Router();
const { validatorRegisterUser, validatorLoginUser } = require('../validators/auth');
const { registerController, loginController, getUsers, getUser, deleteUser, updateUser, uploadProfilePic } = require('../controllers/auth');
const upload = require('../middleware/multer');

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.post("/register", validatorRegisterUser, registerController);
router.post("/login", validatorLoginUser, loginController);
router.post("/users/:id/upload-profile-pic", upload.single('profilePicture'), uploadProfilePic);

module.exports = router;