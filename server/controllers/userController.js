// const express = require('express')
const createError = require('http-errors')
// const mongoose = require('mongoose')

// const pool = require('../db/dbPostgres');
// const postgresQuries = require('../db/posgresQueries');

// const authController = require('./authController');
const UserMg = require('../db/mongo/models/userModel')
const GameMg = require('../db/mongo/models/gameModel')
const CardMg = require('../db/mongo/models/cardModel')
const { ObjectId } = require('mongodb')

const getOne = async (req, res, next) => {
    const { id } = req.params

    console.log('get one user endpoint')
    try {
        const user = await UserMg.findById(id)

        if (!user) {
            return next(createError(404))
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: user,
            },
        })
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const getAll = async (req, res, next) => {
    console.log('----------getAll users endpoint------------')
    try {
        const users = await UserMg.find()

        res.status(200).json({
            status: 'success',
            count: users.length,
            data: {
                users: users,
            },
        })
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const createOne = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        date_of_birth,
        role,
    } = req.body
    try {
        const user = await UserMg.create({
            firstName: firstName,
            lastName: lastName,
            date_of_birth: date_of_birth,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            role: role,
        })

        //create pg user
        // IMPORTANT: I USED THE Already hashed password from the mongo user


        // await user.save()
        res.status(201).json({
            status: 'success',
            data: {
                user: user,
            },
        })
    } catch (error) {
        console.log('Error Type : ', error.name)
        if (error.name === 'ValidationError') {
            // Erreur de validation Mongoose
            const validationErrors = {}

            // Personnaliser les messages d'erreur
            for (const field in error.errors) {
                const errorMessage = error.errors[field].message
                validationErrors[field] = errorMessage
            }

            return res.status(400).json({
                status: 'fail',
                message: {
                    errors: validationErrors,
                },
            })
        }
        return next(createError(500, `somthing went wrong ${error}`))
    }
}

const deleteOne = async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedUser = await UserMg.findByIdAndDelete(id)
        //console.log(deletedUser);
        if (!deletedUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'user not found',
            })
        }


        res.status(200).json({
            status: 'success',
            message: 'user deleted successfully',
        })
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const updateOne = async (req, res, next) => {
    const { id } = req.params
    //const { name } = req.body
    //console.log("update user endpoint");
    const { name, email, password, passwordConfirm, date_of_birth } = req.body
    try {
        //user with the id "id" does not existe then we create it
        // const user = await UserMg.findByIdAndUpdate(req.params.id , req.body , {
        // new : true,
        // runValidators : true
        // } );
        const CurrentUser = await UserMg.findOne({ _id: id })
        const updatedUser = await UserMg.updateOne(
            { _id: id },
            { $set: req.body },
            {
                new: true,
                runValidators: true,
            }
        )

        //pg user update
        //search ny email
        let userEmail

        if (req.body.email) {
            userEmail = CurrentUser.email
        } else {
            userEmail = updatedUser.email
        }

        console.log('userEmail', userEmail)


        return res.status(201).json({
            status: 'success',
            data: {
                user: updatedUser,
            },
        })
    } catch (error) {
        console.log('Error Type : ', error.name)
        if (error.name === 'ValidationError') {
            // Erreur de validation Mongoose
            const validationErrors = {}

            // Personnaliser les messages d'erreur
            for (const field in error.errors) {
                const errorMessage = error.errors[field].message
                validationErrors[field] = errorMessage
            }

            return res.status(400).json({
                status: 'fail',
                message: {
                    errors: validationErrors,
                },
            })
        }
        return next(createError(500, `${error}`))
    }
}

const getMe = async (req, res, next) => {
    const userId = req.user._id
    try {
        const user = await UserMg.findById(userId).populate('games')
        if (!user) {
            return next(createError(404, 'user not found'))
        }
        res.status(200).json({
            status: 'success',
            data: {
                user: user,
            },
        })
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const deleteMe = async (req, res, next) => {
    const userId = req.user._id
    try {
        const deletedUser = await UserMg.findByIdAndDelete(userId)
        if (!deletedUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'user not found',
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'user deleted successfully',
        })
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const updateMe = async (req, res, next) => {
    const userId = req.user._id
    const { firstName, lastName, date_of_birth } = req.body
    try {
        const user = await UserMg.findById(userId)
        if (!user) {
            return next(createError(404))
        }

        if (firstName) {
            user.firstName = firstName
        }
        if (lastName) {
            user.lastName = lastName
        }
        if (date_of_birth) {
            user.date_of_birth = date_of_birth
        }
        await user.save({ validateBeforeSave: false })

        res.status(200).json({
            status: 'success',
            data: {
                user: user,
            },
        })
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const updateMyStatus = async (req, res, next) => {
    console.log('updateStatus endpoint')
    const userId = req.user._id
    const { status } = req.body
    try {
        const user = await UserMg.findById(userId)
        if (!user) {
            return next(createError(404))
        }

        if (status) {
            user.status = status
        }

        await user.save({ validateBeforeSave: false })

        res.status(200).json({
            status: 'success',
            data: {
                user: user,
            },
        })
    } catch (error) {
        console.log(error)
        return next(createError(500, 'error update me'))
    }
}

const joinGame = async (req, res, next) => {
    const { gameId } = req.params
    const userId = req.user._id
    // try {
    const game = await GameMg.findById(gameId)
    if (!game) {
        return next(createError(404), 'game not found')
    }
    if (game.status === 'started') {
        return next(createError(400, 'game already started'))
    }
    if (game.status === 'ended') {
        return next(createError(400, 'game already ended'))
    }
    if (game.players.includes(userId)) {
        return next(createError(400, 'user already joined'))
    }
    if (game.players.length >= 4) {
        return next(createError(400, 'game is full'))
    }
    game.players.push(userId)
    await game.save()
    res.status(200).json({
        status: 'success',
        data: {
            game: game,
        },
    })
    // } catch (error) {
    //     console.log(error)
    //     return next(createError(500))
    // }
}

const inactivePlayer = async (req, res, next) => {
    const { gameId } = req.params
    const userId = req.user._id
    try {
        const user = await UserMg.findById(userId)
        if (!user) {
            return next(createError(404))
        }

        const game = await GameMg.findById(gameId)
        if (!game) {
            return next(createError(404))
        }
        if (game.status !== 'started') {
            return next(createError(400, 'game not started'))
        }
        if (!game.players.includes(userId)) {
            return next(createError(400, 'user not in game'))
        }
        if (game.players[game.turn].toString() !== userId.toString()) {
            return next(createError(400, 'not your turn'))
        }
        game.turn = (game.turn + 1) % game.players.length
        await game.save()
        res.status(200).json({
            status: 'success',
            data: {
                game: game,
            },
        })
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const getUserIndex = async (req, res, next) => {
    const { gameId } = req.params
    const userId = req.user._id
    try {
        const user = await UserMg.findById(userId)
        if (!user) {
            return next(createError(404, 'user not found'))
        }
        const game = await GameMg.findById(gameId)
        if (!game) {
            return next(createError(404, 'game not found'))
        }

        const index = game.players.findIndex((player) => {
            return player.toString() === userId.toString()
        })
        res.status(200).json({
            status: 'success',
            data: {
                index: index,
            },
        })
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const getMostUsedCard = async (req, res, next) => {
    const { id } = req.user
    try {
        const user = await UserMg.findById(id)
        if (!user) {
            return next(createError(404, 'user not found'))
        }
        const aggregateOptions = [
            {
                $match: {
                    _id: new ObjectId(id),
                }
            },
            {
                $unwind: '$cardsPlayed',
            },
            {
                $group: {
                    _id: {
                        userId: "$_id",
                        cardId: '$cardsPlayed',
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
            {
                $group: {
                    _id: "$_id.userId", // this will group back by the user's ID
                    mostPlayedCard: {
                        $first: '$_id.cardId',
                    },
                    count: {
                        $first: '$count',
                    },
                },
            },
            {
                $lookup: {
                    from: 'cards', // Replace with your actual Card collection name
                    localField: 'mostPlayedCard',
                    foreignField: '_id',
                    as: 'mostPlayedCardDetails',
                },
            },
            {
                $unwind: '$mostPlayedCardDetails',
            },
        ]
        
        const card = await UserMg.aggregate(aggregateOptions)
        res.status(200).json({
            status: 'success',
            data: {
                card: card,
            },
        })
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const getLeaderBoard = async (req, res, next) => {
    try {
        const aggregateOptions = [
            {
                $group:
                    /**
                     * _id: The id of the group.
                     * fieldN: The first field name.
                     */
                    {
                        _id: '$winner',
                        totalWins: {
                            $sum: 1,
                        },
                    },
            },
            {
                $sort:
                    /**
                     * Provide any number of field/order pairs.
                     */
                    {
                        totalWins: -1,
                    },
            },
            {
                $limit:
                    /**
                     * Provide the number of documents to limit.
                     */
                    10,
            },
            {
                $lookup:
                    /**
                     * from: The target collection.
                     * localField: The local join field.
                     * foreignField: The target join field.
                     * as: The name for the results.
                     * pipeline: Optional pipeline to run on the foreign collection.
                     * let: Optional variables to use in the pipeline field stages.
                     */
                    {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user',
                    },
            },
            {
                $unwind:
                    /**
                     * path: Path to the array field.
                     * includeArrayIndex: Optional name for index.
                     * preserveNullAndEmptyArrays: Optional
                     *   toggle to unwind null and empty values.
                     */
                    {
                        path: '$user',
                    },
            },
        ]
        const users = await GameMg.aggregate(aggregateOptions)
        res.status(200).json({
            status: 'success',
            data: {
                users: users,
            },
        })
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const getPlaytime = async (req, res, next) => {
    try {
        const aggregateOptions = [
            {
                $match:
                    /**
                     * query: The query in MQL.
                     */
                    {
                        players: req.user._id,
                    },
            },
            {
                $addFields: {
                    duration: {
                        $subtract: ['$updatedAt', '$createdAt'],
                    },
                },
            },
            {
                $group:
                    /**
                     * _id: The id of the group.
                     * fieldN: The first field name.
                     */
                    {
                        _id: null,
                        playTime: {
                            $sum: '$duration',
                        },
                    },
            },
        ]
        let [playtime] = await GameMg.aggregate(aggregateOptions)
        if (!playtime) {
            playtime = {
                playTime: 0,
            }
        }
        res.status(200).json({
            status: 'success',
            data: {
                playtime: playtime,
            },
        })
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

// const makeMove = async (req, res, next) => {
//   const { id } = req.params;
//   const userId = req.user._id;
//   const { cardId, gameId } = req.body;

//   const user = await UserMg.findById(userId);
//   if (!user) {
//     return next(createError(404, "user not found"));
//   }
//   const game = await GameMg.findById(gameId).populate("currentCard");
//   if (!game) {
//     return next(createError(404, "game not found"));
//   }
//   const card = await CardMg.findById(cardId);
//   if (!card) {
//     return next(createError(404, "card not found"));
//   }
//   if (game.status !== "started") {
//     return next(createError(400, "game not started"));
//   }

// const signup = async(req,res,next)=>{

//     try{
//         console.log("signup endpoint");

//     }
//     catch(error){
//         res.status(500).json({
//             status : 'fail',
//             message : 'Server internal error !',
//             error : error
//         })
//     }
// }

module.exports = {
    // signup,
    updateOne,
    deleteOne,
    createOne,
    getAll,
    getOne,
    getMe,
    deleteMe,
    updateMe,
    joinGame,
    updateMyStatus,
    getUserIndex,
    inactivePlayer,
    getMostUsedCard,
    getLeaderBoard,
    getPlaytime
}
