require('dotenv').config() //Pulling out the enviroment variables

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser");

//Importing all the controllers
const auth = require('./routes/auth.js')
const user = require('./routes/user.js')
const comment = require('./routes/comment.js')
const post = require('./routes/post.js')

//Connecting to the database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))


app.use(express.json());
app.use(cookieParser());

//Routes here hehehe

app.use('/api/v1/auth', auth)
app.use('/api/v1/user', user);
app.use('/api/v1/post', post);
app.use('/api/v1/comment', comment);

app.listen(4000, () => console.log(`Server Started`))