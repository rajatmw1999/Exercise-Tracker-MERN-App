const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//Mongoose connection to the Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true});


//Importing and using the routes for database crud operatious of the User and Exercises
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));
}

app.listen(port, () => {
    console.log(`Server is running now on ${port}`);
})
