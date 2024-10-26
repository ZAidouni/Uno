// const express = require('express')
// const createError = require('http-errors')
// const mongoose = require('mongoose')

// const pool = require('../db/dbPostgres');
// const postgresQuries = require('../db/posgresQueries');

// const authController = require('./authController');
// const { User } = require('../db/mongo/models')

// const getOne = async (req, res, next) => {
//     const { id } = req.params
//     try {
//         const user = await User.findById(id);

//         if(!user) {
//             return next(createError(404));
//         }

//         res.status(200).json({ 
//             status : "success",
//             data : {
//                 user : user
//             }   
//          });
//     } catch (error) {
//         console.log(error)
//         return next(createError(500))
//     }
// }

// const getAll = async (req, res, next) => {

//     try {

//         //postgres test
        
//         // pool.query(postgresQuries.getUsers, (error, results)=>{
//         //     if(error){
//         //         throw error;
//         //     }
//         //     postgres = results.rows;
//         //     console.log("postgres user : ", results.rows);

//         // })

//         //console.log("getAll users endpoint");
//         const users = await User.find();

//         res.status(200).json({ 
            
//             status : 'success',
//             count : users.length,
//             data : {
//                 users : users,

                
//             },
//             // dataPostres : {
//             //     postgres : postgres
//             // }
//         });
        
//     } catch (error) {
//         console.log(error)
//         return next(createError(500))
//     }
// }

// const createOne = async (req, res, next) => {
//     const { firstName,lastName,email, password, passwordConfirm , date_of_birth, role } = req.body
//     try {
//         const user = await User.create({
//                 firstName: firstName,
//                 lastName: lastName,
//                 date_of_birth: date_of_birth,
//                 email : email,
//                 password : password,
//                 passwordConfirm : passwordConfirm,
//                 role : role
//             });
//             // pool.query(postgresQuries.addUser,[firstName,lastName,email,password,passwordConfirm,role],(error, results)=>{
//             //     console.log("postgres user : ", results.rows);
//             //     if(error){
//             //         throw error;
//             //     }
//             //     postgres = results.rows;
    
//             // })
//         // await user.save()
//         res.status(201).json({ 
//             status : "success",
//             data : {
//                 user : user
//             }
//          })
//     } catch (error) {
//         console.log("Error Type : ", error.name)
//         if (error.name === 'ValidationError') {
//             // Erreur de validation Mongoose
//             const validationErrors = {};
      
//             // Personnaliser les messages d'erreur
//             for (const field in error.errors) {
//               const errorMessage = error.errors[field].message;
//               validationErrors[field] = errorMessage;
//             }

//             return res.status(400).json({ 
//                 status : "fail",
//                 message : {
//                     errors: validationErrors 
//                 } 
//             });
//         }
//         return next(createError(500, `somthing went wrong ${error}`));
//     }
// }

// const deleteOne = async (req, res, next) => {
//     const { id } = req.params
//     try {
//         const deletedUser = await User.findByIdAndDelete(id)

//         if (!deletedUser) {
//             return res.status(404).json({ 
//                 status : "fail",
//                 message: 'user not found' 
//             });
//         }    
        
//         res.status(200).json({ 
//             status : "success",
//             message : 'user deleted successfully'
//          })
//     } catch (error) {
//         console.log(error)
//         return next(createError(500))
//     }
// }

// const updateOne = async (req, res, next) => {
//     const { id } = req.params
//     //const { name } = req.body

//     const { name,email, password, passwordConfirm , date_of_birth } = req.body
//     try {

//         //user with the id "id" does not existe then we create it
//         const user = await User.findByIdAndUpdate(req.params.id , req.body , {
//             new : true,
//             runValidators : true
//         } );
        
//         return res.status(201).json({
//             status : "success",
//             data : {
//                 user : user
//             }
//         })

//     } catch (error) {
//         console.log("Error Type : ", error.name)
//         if (error.name === 'ValidationError') {
//             // Erreur de validation Mongoose
//             const validationErrors = {};
      
//             // Personnaliser les messages d'erreur
//             for (const field in error.errors) {
//               const errorMessage = error.errors[field].message;
//               validationErrors[field] = errorMessage;
//             }

//             return res.status(400).json({ 
//                 status : "fail",
//                 message : {
//                     errors: validationErrors 
//                 }
//             });
//         }
//         return next(createError(500))
//     }
// }


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

// let router = express.Router()

// router.get('/:id', getOne)
// router.post('/',authController.protect, authController.restrictTo('admin'),createOne)
// router.get('/',authController.protect, authController.restrictTo('admin'),getAll)
// router.delete('/:id',authController.protect, authController.restrictTo( 'admin'), deleteOne)
// router.put('/:id', updateOne)

// router.post("/signup", authController.signup);
// router.post("/login", authController.login);
// router.post("/logout", authController.logout);

// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

// router.patch("/updateMyPassword", authController.protect, authController.updatePassword);


// module.exports = router