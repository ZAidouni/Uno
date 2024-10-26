// require("dotenv").config();
// const mongoose = require('mongoose')
// const { createAgent } = require("@forestadmin/agent");
// const {
//   createMongooseDataSource,
// } = require("@forestadmin/datasource-mongoose");

// // const Models = require("../models");

// const initiateForestAdmin = (app) => {
//   createAgent({
//     authSecret: process.env.FOREST_AUTH_SECRET,
//     envSecret: process.env.FOREST_ENV_SECRET,
//     isProduction: process.env.NODE_ENV === "production",
//   })
//     .addDataSource(createMongooseDataSource(mongoose, { flattenMode: "auto", serverSelectionTimeoutMS: 30000 }))
//     .mountOnExpress(app)
//     .start();
// };

// module.exports = { initiateForestAdmin };
