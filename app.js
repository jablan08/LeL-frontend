const createError  = require('http-errors');
const express      = require('express');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const cors         = require("cors");
const session      = require("express-session")
const moment       = require("moment")
const path         = require('path')
const PORT         = 8888;



const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');
const authRouter = require("./routes/auth")

require("dotenv").config();
require("./db/db")

console.log(PORT)

const app = express();

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));


const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));


app.get('/hello', (req, res) => {
  res.send('hello')
})
app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use("/login", authRouter)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.use((req, res, next)=>{
  next(createError(404));
});



module.exports = app;