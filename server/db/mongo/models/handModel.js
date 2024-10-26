const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let handSchema = new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    }],
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    turn: {
        type: Boolean,
        default: false
    },
    inactive: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Hand', handSchema);