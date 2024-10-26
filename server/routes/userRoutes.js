const express = require('express')
const userController = require(`./../controllers/userController`)
const authController = require(`./../controllers/authController`)

const router = express.Router()

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)

router.route('/forgotPassword').post(authController.forgotPassword)
router.route('/resetPassword/:token').patch(authController.resetPassword)

router
    .route('/my-index/:gameId')
    .get(authController.protect, userController.getUserIndex)

router
    .route('/updateMyPassword')
    .patch(authController.protect, authController.updatePassword)

router.route('/logout').get(authController.logout)

router
    .route('/me')
    .get(authController.protect, userController.getMe)
    .patch(authController.protect, userController.updateMe)
    .delete(authController.protect, userController.deleteMe)
    .put(authController.protect, userController.updateMyStatus)

router
    .route('/leader-board')
    .get(authController.protect, userController.getLeaderBoard)

router
    .route('/playtime')
    .get(authController.protect, userController.getPlaytime)

router
    .route('/my-most-used-card')
    .get(authController.protect, userController.getMostUsedCard)

router
    .route('/joingame/:gameId')
    .patch(authController.protect, userController.joinGame)

router
    .route('/inactive/:id')
    .patch(authController.protect, userController.inactivePlayer)

router
    .route('/')
    .get(
        authController.protect,
        authController.restrictTo('admin'),
        userController.getAll
    )
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        userController.createOne
    )

router
    .route('/:id')
    .get(
        authController.protect,
        authController.restrictTo('admin'),
        userController.getOne
    )
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        userController.updateOne
    )
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        userController.deleteOne
    )

module.exports = router
