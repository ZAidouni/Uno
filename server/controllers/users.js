const express = require('express')
const createError = require('http-errors')
const mongoose = require('mongoose')

const { User } = require('../models')

const getOne = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await User.findById(id);

        if(!user) {
            return next(createError(404));
        }

        res.status(200).json({ 
            status : "success",
            data : {
                user : user
            }   
         });
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const getAll = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({ 
            
            status : 'success',
            count : users.length,
            data : {
                users : users 
            } 
        });
        
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const createOne = async (req, res, next) => {
    const { name,email, password, passwordConfirm , date_of_birth } = req.body
    try {
        const user = await User.create({
                name: name,
                date_of_birth: date_of_birth,
                email : email,
                password : password,
                passwordConfirm : passwordConfirm 
            });
        // await user.save()
        res.status(201).json({ 
            status : "success",
            data : {
                user : user
            }
         })
    } catch (error) {
        console.log("Error Type : ", error.name)
        if (error.name === 'ValidationError') {
            // Erreur de validation Mongoose
            const validationErrors = {};
      
            // Personnaliser les messages d'erreur
            for (const field in error.errors) {
              const errorMessage = error.errors[field].message;
              validationErrors[field] = errorMessage;
            }

            return res.status(400).json({ 
                status : "fail",
                message : {
                    errors: validationErrors 
                } 
            });
        }
        return next(createError(500))
    }
}

const deleteOne = async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({ 
                status : "fail",
                message: 'user not found' 
            });
        }    
        
        res.status(200).json({ 
            status : "success",
            message : 'user deleted successfully'
         })
    } catch (error) {
        console.log(error)
        return next(createError(500))
    }
}

const updateOne = async (req, res, next) => {
    const { id } = req.params
    //const { name } = req.body

    const { name,email, password, passwordConfirm , date_of_birth } = req.body
    try {

        //user with the id "id" does not existe then we create it
        const user = await User.findByIdAndUpdate(req.params.id , req.body , {
            new : true,
            runValidators : true
        } );
        
        return res.status(201).json({
            status : "success",
            data : {
                user : user
            }
        })

    } catch (error) {
        console.log("Error Type : ", error.name)
        if (error.name === 'ValidationError') {
            // Erreur de validation Mongoose
            const validationErrors = {};
      
            // Personnaliser les messages d'erreur
            for (const field in error.errors) {
              const errorMessage = error.errors[field].message;
              validationErrors[field] = errorMessage;
            }

            return res.status(400).json({ 
                status : "fail",
                message : {
                    errors: validationErrors 
                }
            });
        }
        return next(createError(500))
    }
}

let router = express.Router()

router.get('/:id', getOne)
router.post('/', createOne)
router.get('/', getAll)
router.delete('/:id', deleteOne)
router.put('/:id', updateOne)

module.exports = router