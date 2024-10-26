const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const authController = require('../controllers/authController');
const gameController = require('../controllers/gameController');

const router = express.Router();

router  
    .route("/getGamesInProgress")
    .get(authController.protect, gameController.getGamesInProgress);

router  
    .route("/getMyGame")
    .get(authController.protect, gameController.getMyGame)

router  
    .route("/countUserWins")
    .get(authController.protect, gameController.countUserWins)

router.route("/countUserPlayedGames")
    .get(authController.protect, gameController.countUserPlayedGames)

router
    .route("/getGamesInProgress")
    .get(authController.protect, gameController.getGamesInProgress);

router
    .route("/getMyGame")
    .get(authController.protect, gameController.getMyGame)

router
    .route("/countUserWins")
    .get(authController.protect, gameController.countUserWins)

router.route("/countUserPlayedGames")
    .get(authController.protect, gameController.countUserPlayedGames)

router
.route("/")
.get(authController.protect,authController.restrictTo('admin'),gameController.getAll)
.post(authController.protect,gameController.create);

router
.route("/:id")
.post(authController.protect,gameController.startGame)
.get(authController.protect,gameController.getOne)

module.exports = router;
