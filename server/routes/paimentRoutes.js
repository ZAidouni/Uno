const express = require("express");
const paimentController = require('./../controllers/paimentController');
const authController = require('./../controllers/authController');

const router = express.Router();



router.post('/checkout-session', authController.protect, paimentController.getCheckoutSession);

module.exports = router;