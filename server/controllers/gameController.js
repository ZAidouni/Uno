const express = require('express')
const createError = require('http-errors')
const mongoose = require('mongoose')

const UserMg = require('../db/mongo/models/userModel')
const HandMg = require('../db/mongo/models/handModel')
const GameMg = require('../db/mongo/models/gameModel')
const CardMg = require('../db/mongo/models/cardModel')

getAll = async (req, res, next) => {
    try {
        const games = await GameMg.find({})
        res.send(games)
    } catch (error) {
        console.log(error.message)
    }
}

getOne = async (req, res, next) => {
    const { id } = req.params
    const userId = req.user._id
    console.log('get one game endpoint')
    try {
        const game = await GameMg.findById(id)
            .populate('owner')
            .populate('deck')
            .populate('discard')
            .populate('currentCard')

        if (!game) {
            return next(createError(404, 'game not found'))
        }

        let players = []
        for (let i = 0; i < game.players.length; i++) {
            const player = await UserMg.findById(game.players[i])
            let hand
            if (player._id.toString() === userId.toString()) {
                hand = await HandMg.findOne({
                    player: player._id,
                    game: game._id,
                }).populate('cards')
            } else {
                hand = await HandMg.findOne({
                    player: player._id,
                    game: game._id,
                })
            }
            players.push({
                _id: player._id,
                username: player.firstName + ' ' + player.lastName[0] + '.',
                hand: hand,
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                game: game,
                players: players,
            },
        })
    } catch (error) {
        console.log(error.message)
        return next(createError(500, 'internal server error'))
    }
}

const create = async (req, res, next) => {
    const userId = req.user._id
    const { players } = req.body

    const user = await UserMg.findById(userId)
    if (!user) {
        return next(createError(404, 'user not found'))
    }
    if (user.games.length >= 5 && user.status == 'base') {
        return next(createError(400, 'game limit reached'))
    }

    const gameStarted = await GameMg.findOne({
        owner: userId,
        status: 'started',
    })
    if (gameStarted) {
        return next(createError(400, 'user already has a started game'))
    }

    try {
        let discard = []
        const deck = await CardMg.find({})

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[array[i], array[j]] = [array[j], array[i]] // Swap elements
            }
        }

        shuffleArray(deck)

        const numberCards = await CardMg.find({ type: 'number' })
        const randomIndex = Math.floor(Math.random() * numberCards.length)
        const currentCard = numberCards[randomIndex]
        discard.push(currentCard)

        const game = await GameMg.create({
            players: [userId, ...(players || [])],
            owner: userId,
            deck: deck.filter(
                (card) => card._id.toString() !== currentCard._id.toString()
            ),
            discard: discard,
            currentCard: currentCard,
            currentColor: currentCard.color,
            status: 'waiting',
        })

        user.games.push(game._id)
        await user.save({ validateBeforeSave: false })
        res.send(game)
    } catch (error) {
        console.log(error.message)
        return next(createError(500, 'internal server error'))
    }
}

const startGame = async (req, res, next) => {
    const { id } = req.params
    const userId = req.user._id

    const user = await UserMg.findById(userId)
    if (!user) {
        return next(createError(404, 'user not found'))
    }
    const game = await GameMg.findById(id).populate('players')
    if (!game) {
        return next(createError(404, 'game not found'))
    }
    if (game.owner.toString() !== userId.toString()) {
        return next(createError(403, 'only the owner can start the game'))
    }
    if (game.status === 'ended') {
        return next(createError(400, 'game already ended'))
    }
    if (game.status === 'started') {
        return next(createError(400, 'game already started'))
    }

    try {
        game.status = 'started'
        game.turn = 0
        game.direction = 'clockwise'
        game.players = game.players.sort(() => Math.random() - 0.5)

        for (let i = 0; i < game.players.length; i++) {
            const player = await UserMg.findById(game.players[i])
            console.log(
                '🚀 ~ file: gameController.js:92 ~ startGame ~ player:',
                player
            )

            const hand = await HandMg.create({
                player: player._id,
                cards: [],
                game: game._id,
            })

            for (let j = 0; j < 7; j++) {
                const randomIndex = Math.floor(Math.random() * game.deck.length)
                console.log(
                    '🚀 ~ file: gameController.js:105 ~ startGame ~ randomIndex:',
                    randomIndex
                )
                const card = game.deck[randomIndex]
                hand.cards.push(card)
                game.deck.splice(randomIndex, 1)
            }
            console.log(
                '🚀 ~ file: gameController.js:102 ~ startGame ~ hand:',
                hand
            )
            await hand.save({ validateBeforeSave: false })
            await player.save({ validateBeforeSave: false })
        }
        await game.save({ validateBeforeSave: false })
        res.send(game)
    } catch (error) {
        console.error(error)
        return next(createError(500))
    }
}

const getGamesInProgress = async (req, res, next) => {
    console.log('get games in progress endpoint')
    try {
        const games = await GameMg.find({
            status: 'waiting',
            players: {
                $nin: req.user._id,
            },
        }).populate('owner')
        console.log('Games : ', games)
        res.json({ games: games || [] })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message:
                "Une erreur s'est produite lors de la récupération des jeux",
            details: err.message,
        })
    }
}

const getMyGame = async (req, res) => {
    console.log('get my game status')
    const ObjectId = mongoose.Types.ObjectId
    try {
        const game = await GameMg.findOne({
            status: ['started', 'waiting'],
            players: new ObjectId(req.user._id),
        })
        console.log('game : ', game)
        if (game) {
            res.json({
                game,
            })
        } else {
            res.json({
                message: 'You are not in any game',
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: "Une erreur s'est produite lors de la récupération du jeu",
            details: err.message,
        })
    }
}

const countUserWins = async (req, res) => {
    console.log('get user wins count')
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id)

        const result = await GameMg.aggregate([
            {
                $match: {
                    winner: userId,
                },
            },
            {
                $count: 'userWins',
            },
        ])

        res.json(result[0] || { userWins: 0 })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message:
                "Une erreur s'est produite lors du comptage des victoires de l'utilisateur",
            details: err.message,
        })
    }
}

const countUserPlayedGames = async (req, res) => {
    console.log('count user played games endpoints')
    const userId = req.user._id

    try {
        const result = await GameMg.aggregate([
            {
                $match: {
                    players: new mongoose.Types.ObjectId(req.user._id),
                },
            },
            { $count: 'count' },
        ])

        let count = 0
        if (result.length > 0) {
            count = result[0].count
        }

        res.json({ userPlayedGames: count })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'error',
            message:
                "Une erreur s'est produite lors de la récupération des jeux joués par l'utilisateur",
            details: err.message,
        })
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    startGame,
    getGamesInProgress,
    getMyGame,
    countUserWins,
    countUserPlayedGames,
}
