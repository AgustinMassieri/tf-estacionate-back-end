const express = require('express');
const router = express.Router();
const {sendResetPasswordEmail, validateToken} = require('../controllers/notifications')

router.post("/sendEmail", sendResetPasswordEmail);
router.get('/validateToken/:token', validateToken);

module.exports = router;