const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let cardSchema = new Schema({
    color: {
        type: String,
        enum: ['red', 'blue', 'green', 'yellow'],
    },
    value: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['number', 'skip', 'reverse', 'draw2', 'draw4', 'wild'],
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Card', cardSchema);