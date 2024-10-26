// const request = require('supertest')
// const socketIOClient = require('../../../server/sockets')
// const http = require('http')
// const app = require('../../../server/app') // assuming that your express app is exported from app.js
// const server = http.createServer(app)
// const io = require('socket.io')(server)
// const { setupDB, closeDatabase, clearDatabase } = require('./setup-mongo-db') // this is your file that sets up test database

// setupDB('endpoint-testing') // setting up a separate in-memory database for testing

// let clientSocket

// beforeEach((done) => {
//     // Setup
//     clientSocket = socketIOClient.connect(
//         `http://localhost:${process.env.PORT}`,
//         {
//             'reconnection delay': 0,
//             'reopen delay': 0,
//             'force new connection': true,
//             transports: ['websocket'],
//         }
//     )

//     clientSocket.on('connect', () => {
//         done()
//     })
// })

// afterEach((done) => {
//     if (clientSocket.connected) {
//         clientSocket.disconnect()
//     }
//     done()
// })

// describe('Socket.IO server tests', () => {
//     test('should establish a connection with the client', (done) => {
//         clientSocket.on('connection', () => {
//             done()
//         })
//     })

//     test('should respond with an error if a player tries to play a card out of turn', (done) => {
//         clientSocket.on('playCardResponse', (data) => {
//             expect(data.success).toBe(false)
//             expect(data.message).toBe('Not your turn')
//             done()
//         })
//         clientSocket.emit('playCard', {
//             gameId: 'testGameId1',
//             playerId: 'testPlayerId1',
//             cardId: 'testCardId1',
//             color: 'red',
//         })
//     })

//     test('should establish a connection with the client', (done) => {
//         clientSocket.on('disconnect', () => {
//             done()
//         })
//     })
// })
