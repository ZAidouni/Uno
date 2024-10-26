const mongoose = require('mongoose')
const createError = require('http-errors')
const http = require('http')
const UserMg = require('../db/mongo/models/userModel')
const GameMg = require('../db/mongo/models/gameModel')
const CardMg = require('../db/mongo/models/cardModel')
const HandMg = require('../db/mongo/models/handModel')

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected')
        socket.emit('connection', null)

        socket.on('playCard', async ({ gameId, playerId, cardId, color }) => {
            try {
                const id = gameId
                const userId = playerId
                const player = await UserMg.findById(userId)
                const game = await GameMg.findById(id).populate(
                    'discard currentCard'
                )
                if (!game) throw new Error('game not found')
                if (!game.players.includes(userId)) {
                    throw new Error('player not in game')
                }
                game.players.map((player, index) => {
                    if (player.toString() === userId) {
                        if (index !== game.turn) {
                            throw new Error('Not your turn')
                        }
                    }
                })
                const card = await CardMg.findById(cardId)
                if (
                    card.type === 'number' &&
                    card.color !== game.currentColor &&
                    card.value !== game.currentCard.value
                ) {
                    throw new Error('Invalid card')
                }
                if (
                    (card.type === 'reverse' ||
                        card.type === 'skip' ||
                        card.type === 'draw2') &&
                    card.color !== game.currentColor &&
                    card.type !== game.currentCard.type
                ) {
                    throw new Error('Invalid card')
                }
                if (!card) throw new Error('card not found')
                const hand = await HandMg.findOne({
                    player: userId,
                    game: gameId,
                }).populate('cards')

                const cardInHand = hand.cards.find(
                    (c) => c._id.toString() === card._id.toString()
                )

                if (!cardInHand) {
                    throw new Error('card not in hand')
                }

                hand.cards = hand.cards.filter(
                    (c) => c._id.toString() !== card._id.toString()
                )

                game.discard.push(card)
                game.currentCard = card
                if (card.type === 'wild' || card.type === 'draw4') {
                    game.currentColor = color
                } else {
                    game.currentColor = card.color
                }
                await game.save({ validateBeforeSave: false })

                const nextPlayer =
                    game.players[(game.turn + 1) % game.players.length]

                if (card.type === 'skip') {
                    await skipTurn(game._id, player._id)
                }
                if (card.type === 'reverse') {
                    await reverseOrder(game._id)
                    await endTurn(player._id, game._id)
                }
                if (card.type === 'draw2') {
                    await drawTwo(game._id, nextPlayer)
                    await endTurn(player._id, game._id)
                }
                if (card.type === 'draw4') {
                    if (!color) {
                        throw new Error('No color was selected')
                    }
                    await drawFour(game._id, nextPlayer, color)
                    await endTurn(player._id, game._id)
                }
                if (card.type === 'wild') {
                    await changeColor(color, game._id)
                    await endTurn(player._id, game._id)
                }
                if (card.type === 'number') {
                    await endTurn(player._id, game._id)
                }
                if (game.deck.length == 0) {
                    await shuffle(game._id)
                }

                // Save the changes
                await hand.save({ validateBeforeSave: false })
                await game.save({ validateBeforeSave: false })

                player.cardsPlayed.push(card._id)
                await player.save({ validateBeforeSave: false })

                socket.emit('playCardResponse', {
                    success: true,
                    message: 'Card played successfully',
                    card,
                })
                socket.broadcast.emit('playCardResponse', {
                    success: true,
                    message: 'Card played successfully',
                    card,
                })
            } catch (error) {
                socket.emit('playCardResponse', {
                    success: false,
                    message: error.message,
                })
            }
        })

        socket.on('drawCard', async ({ playerId, gameId }) => {
            const game = await GameMg.findById(gameId).populate(
                'discard currentCard'
            )
            try {
                game.players.map((player, index) => {
                    if (player.toString() === playerId) {
                        if (index !== game.turn) {
                            throw new Error('Not your turn')
                        }
                    }
                })
                drawCard(playerId, gameId)
                game.turn = (game.turn + 1) % game.players.length
                await game.save()

                socket.emit('drawCardResponse', {
                    success: true,
                    message: 'Card drawn successfully',
                })
                socket.broadcast.emit('drawCardResponse', {
                    success: true,
                    message: 'Card drawn successfully',
                })
            } catch (error) {
                socket.emit('drawCardResponse', {
                    success: false,
                    message: error.message,
                })
            }
        })

        socket.on('joinGame', async ({ gameId, playerId }) => {
            try {
                const game = await GameMg.findById(gameId)
                if (!game) {
                    throw new Error('game not found')
                }
                if (game.status === 'started') {
                    throw new Error('game already started')
                }
                if (game.status === 'ended') {
                    throw new Error('game already ended')
                }
                if (game.players.includes(playerId)) {
                    throw new Error('user already joined')
                }
                if (game.players.length >= 4) {
                    throw new Error('game is full')
                }
                game.players.push(playerId)
                await game.save()
                socket.emit('joinGameResponse', {
                    success: true,
                    message: 'joined successfully',
                    gameId: game._id,
                })
                socket.broadcast.emit('startGameResponse', {
                    success: true,
                    message: 'joined successfully',
                })
            } catch (error) {
                throw new Error(error.message)
            }
        })

        socket.on('startGame', async ({ gameId, playerId }) => {
            const id = gameId
            const userId = playerId

            try {
                const user = await UserMg.findById(userId)
                if (!user) {
                    throw new Error('user not found')
                }
                const game = await GameMg.findById(id).populate('players')
                if (!game) {
                    throw new Error('game not found')
                }
                if (game.players.length < 2) {
                    throw new Error('not enough players')
                }
                if (game.owner.toString() !== userId.toString()) {
                    throw new Error('not the owner')
                }
                if (game.status === 'ended') {
                    throw new Error('game already ended')
                }
                if (game.status === 'started') {
                    throw new Error('game already started')
                }
                game.status = 'started'
                game.turn = 0
                game.direction = 'clockwise'
                game.players = game.players.sort(() => Math.random() - 0.5)

                for (let i = 0; i < game.players.length; i++) {
                    const player = await UserMg.findById(game.players[i])
                    const hand = await HandMg.create({
                        player: player._id,
                        cards: [],
                        game: game._id,
                    })

                    for (let j = 0; j < 7; j++) {
                        const randomIndex = Math.floor(
                            Math.random() * game.deck.length
                        )
                        const card = game.deck[randomIndex]
                        hand.cards.push(card)
                        game.deck.splice(randomIndex, 1)
                    }
                    await hand.save({ validateBeforeSave: false })
                    await player.save({ validateBeforeSave: false })
                }
                await game.save({ validateBeforeSave: false })

                socket.emit('startGameResponse', {
                    success: true,
                    message: 'Game started successfully',
                })

                socket.broadcast.emit('startGameResponse', {
                    success: true,
                    message: 'Game started successfully',
                })
            } catch (error) {
                socket.emit('startGameResponse', {
                    success: false,
                    message: error.message,
                })
            }
        })

        socket.on('leaveGame', async ({ gameId, playerId }) => {
            console.log('leaving game')
            try {
                await leaveGame(playerId, gameId)
                socket.emit('leaveGameResponse', {
                    success: true,
                    message: 'left successfully',
                })
                socket.broadcast.emit('leaveGameResponse', {
                    success: true,
                    message: 'left successfully',
                })
            } catch (error) {
                socket.emit('leaveGameResponse', {
                    success: false,
                    message: error.message,
                })
            }
        })

        socket.on('createGame', async () => {
            console.log('creating game')
            socket.broadcast.emit('createGameResponse', {
                success: true,
            })
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected')
        })
    })
}

async function skipTurn(gameId, playerId) {
    const game = await GameMg.findById(gameId)
    const hand = await HandMg.findOne({
        player: playerId,
        game: gameId,
    }).populate('cards')
    game.turn = (game.turn + 2) % game.players.length
    if (hand.length === 1) {
        await endGame(playerId, gameId)
    }
    await game.save()
}

async function reverseOrder(gameId) {
    const game = await GameMg.findById(gameId).populate('players')
    game.direction =
        game.direction === 'clockwise' ? 'counterclockwise' : 'clockwise'
    game.players.reverse()
    await game.save({ validateBeforeSave: false })
}

async function drawTwo(gameId, playerId) {
    for (let i = 0; i < 2; i++) {
        await drawCard(playerId, gameId)
    }
}

async function drawFour(gameId, playerId, color) {
    for (let i = 0; i < 4; i++) {
        await drawCard(playerId, gameId)
    }
    await changeColor(color, gameId)
    try {
    } catch (error) {
        throw new Error('something went wrong')
    }
}

async function changeColor(color, gameId) {
    const game = await GameMg.findById(gameId).populate('currentCard')
    game.currentColor.color = color
    await game.save()
    try {
    } catch (error) {
        throw new Error('cannot change color')
    }
}

async function drawCard(playerId, gameId) {
    try {
        const player = await UserMg.findById(playerId)
        const game = await GameMg.findById(gameId).populate('deck')
        const hand = await HandMg.findOne({
            player: playerId,
            game: gameId,
        }).populate('cards')

        const card = game.deck.pop()
        hand.cards.push(card)

        if (game.deck.length == 0) {
            await shuffle(game._id)
        }

        await hand.save()
        await player.save({ validateBeforeSave: false })
        await game.save()
    } catch (error) {
        console.log(error.message)
    }
}

async function endTurn(playerId, gameId) {
    console.log('ended-turn')
    const player = await UserMg.findById(playerId)
    const game = await GameMg.findById(gameId)
    const hand = await HandMg.findOne({
        player: playerId,
        game: gameId,
    }).populate('cards')

    // Check if the player has won the game
    if (hand.cards.length === 1) {
        endGame(playerId, gameId)
    } else {
        // Move to the next player
        game.turn = (game.turn + 1) % game.players.length
    }

    // Save the changes
    await game.save()
}

async function endGame(playerId, gameId) {
    console.log(playerId)
    console.log('ended-game')
    const game = await GameMg.findById(gameId)
    game.status = 'ended'
    game.winner = playerId
    await UserMg.findOneAndUpdate(
        { _id: playerId },
        { $inc: { consecutiveWins: 1 } }
    )
    game.players.map(async (player) => {
        await HandMg.findOneAndDelete({
            player: player,
            game: gameId,
        })
        if (player.toString() !== playerId.toString()) {
            await UserMg.findOneAndUpdate(
                { _id: player },
                { $set: { consecutiveWins: 0 } }
            )
        }
    })
    await game.save()
    return true
}

async function shuffle(gameId) {
    const game = await GameMg.findById(gameId)
    if (!game) {
        return next(createError(404, 'game not found'))
    }
    try {
        const discard = game.discard.filter(
            (card) => card._id !== game.currentCard._id
        )
        discard.sort(() => Math.random() - 0.5)
        game.deck = discard
        game.discard = [game.currentCard]

        await game.save()
    } catch {
        console.log(error.message)
    }
}

async function leaveGame(playerId, gameId) {
    // try {
    const user = await UserMg.findById(playerId)
    const game = await GameMg.findById(gameId)
    const hand = await HandMg.findOne({
        player: playerId,
        game: gameId,
    })
    game.players = game.players.filter(
        (player) => player._id.toString() !== playerId
    )
    game.turn = (game.turn + 1) % game.players.length
    game.deck = game.deck.concat(hand.cards)
    game.deck.sort(() => Math.random() - 0.5)
    user.games = user.games.filter(
        (game) => game._id.toString() !== gameId.toString()
    )
    user.warnings += 1
    if (user.warnings >= 3) {
        user.banned = true
    }

    await HandMg.findOneAndDelete({
        player: playerId,
        game: gameId,
    })

    if (game.players.length === 1) {
        endGame(game.players[0], gameId)
    }
    await game.save()
    await user.save({ validateBeforeSave: false })
    // } catch (error) {
    //     console.log(error.message)
    //     throw new Error('cannot kick player')
    // }
}
