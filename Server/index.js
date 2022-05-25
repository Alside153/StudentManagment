var express = require('express');
var StudentController = require('./controller/studentController');

var app = express();

require('./configs/dataBase') //connect to db

var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
app.use(cors());

app.use('/students',StudentController);

app.listen(8000, () => {
    console.log('The server is listening')
});