const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

let Schema = mongoose.Schema

let userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your firstName'],
        // unique: true
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your lastName'],
        // unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please confirm your password'],
        validate: {
            //this only work on CREATE and SAVE
            //if it is an update we have to use save
            validator: function (el) {
                return el === this.password
            },
            message: 'The two passwords are different',
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    date_of_birth: {
        type: Date,
        required: false,
    },
    passwordChangedAt: {
        type: Date,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    games: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Game',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    status: {
        type: String,
        enum: ['base', 'premium'],
        default: 'base',
    },
    warnings: {
        type: Number,
        default: 0,
    },
    banned: {
        type: Boolean,
        default: false,
    },
    cardsPlayed: [{
        type: Schema.Types.ObjectId,
        ref: 'Card',
    }],
    consecutiveWins: {
        type: Number,
        default: 0,
    },

})

userSchema.pre('save', async function (next) {
    //only runs if the password is modified
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined // we actually don't need to store this field, we only use it to verify if the passwords are the same
    next()
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) {
        return next()
    }

    this.passwordChangedAt = Date.now() - 1000
    next()
})

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    console.log({ resetToken }, this.passwordResetToken)
    //exprires in 10 minutes
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    //we return this because this is the one that we will send
    return resetToken
}

// userSchema.methods.changedPasswordAfter = function(JWTTimespamt){
//     if(this.passwordChangedAt){
//         const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
//         console.log("the two timestamps",changedTimeStamp,JWTTimespamt);

//         return JWTTimespamt < changedTimeStamp;
//     }

//     return false;
// };

const User = mongoose.model('User', userSchema)
module.exports = User
