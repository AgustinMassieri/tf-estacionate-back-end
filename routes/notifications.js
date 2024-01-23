const express = require('express');
const router = express.Router();
const {sendResetPasswordEmail, validateToken} = require('../controllers/notifications')

router.post("/sendResetPasswordEmail", sendResetPasswordEmail);
router.get('/validateToken/:token', validateToken);

module.exports = router;