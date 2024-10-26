const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");
const logger = require("morgan");
const cors = require("cors");
// const { initiateForestAdmin } = require('./lib/forestAdminService');
// const { User } = require("./controllers/userController");
const userRouter = require("./routes/userRoutes");
const cardRouter = require("./routes/cardRoutes");
const gameRouter = require("./routes/gameRoutes");
const paimentRouter = require("./routes/paimentRoutes");

const app = express();


//postgres db syncro 
// dbPostgres.sync()
//   .then(() => {
//     console.log('Connexion to Postgres successfull');
//   })
//   .catch((err) => {
//     console.error('Postgres Synchronization error  : ', err);
//   });


// if (process.env.BO == 'true') {
//     initiateForestAdmin(app)
// }

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get("/", function (req, res, next) {
  res.json("API");
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/paiment',paimentRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
});




module.exports = app;
