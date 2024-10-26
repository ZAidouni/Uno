const mongoose = require('mongoose')

let Schema = mongoose.Schema

let gameSchema = new Schema(
    {
        players: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        turn: {
            type: Number,
            default: 0,
        },
        direction: {
            type: String,
            enum: ['clockwise', 'counterclockwise'],
            default: 'clockwise',
        },
        deck: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Card',
            },
        ],
        discard: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Card',
            },
        ],
        currentCard: {
            type: Schema.Types.ObjectId,
            ref: 'Card',
        },
        currentColor: {
            type: String,
            enum: ['red', 'blue', 'green', 'yellow'],
        },
        status: {
            type: String,
            enum: ['waiting', 'started', 'ended'],
            default: 'waiting',
        },
        winner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        timer: {
            type: Number,
            default: 60,
        }
    },
    {
        timestamps: true,
    }
)

// add a db stream on update when warning reaches 3 banned turns to true
gameSchema.pre('save', function (next) {
    if (this.warnings >= 3) {
        this.banned = true
    }
    next()
})

module.exports = mongoose.model('Game', gameSchema)
