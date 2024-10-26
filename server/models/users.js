const mongoose = require('mongoose');
const validator  = require('validator');
const bcrypt = require('bcryptjs');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        // unique: true
    },
    email : {
        type : String,
        required : [true, 'Please provide your email'],
        unique : true,
        lowercase : true,
        validate : {
            validator : validator.isEmail,
            message : 'Please enter a valid email'
        } 
     },
     password : {
        type : String,
        required : [true, 'Please enter password'],
        minlength : 8,
        select : false
     },
     passwordConfirm : {
        type : String,
        required : [true, 'please confirm your password'],
        validate : {
            //this only work on CREATE and SAVE 
            //if it is an update we have to use save 
            validator : function(el){
                return el === this.password;
            },
            message : 'The two passwords are different'
        } 
    },
    date_of_birth: {
        type: Date,
        required: false
    },
    passwordChangedAt : {
        type : Date,
    },
});


userSchema.pre('save', async function(next){
    //only runs if the password is modified
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,12);

    this.passwordConfirm = undefined; // we actually don't need to store this field, we only use it to verify if the passwords are the same
    next();
});

// userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
//     return await bcrypt.compare(candidatePassword,userPassword);
// };


// userSchema.methods.changedPasswordAfter = function(JWTTimespamt){
//     if(this.passwordChangedAt){
//         const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
//         console.log("the two timestamps",changedTimeStamp,JWTTimespamt);
       
//         return JWTTimespamt < changedTimeStamp;
//     }
    
//     return false;
// };


module.exports = mongoose.model("User", userSchema);