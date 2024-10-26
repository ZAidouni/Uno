const UserPostgres = require('../db/postGres/models/users');



const users = UserPostgres.findAll().then((users)=>{
    console.log(users);
}).catch(err =>{
    console.log(err)
});

