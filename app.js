var express = require('express');
var logger = require('morgan');
let dotenv = require('dotenv').config()
var app = express();
var bodyParser = require('body-parser')
const { showPic, showPicById } = require('./controllers/media.controllers')
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use('/images', express.static('public/images'));
app.use('/videos', express.static('public/videos'));
app.use('/documents', express.static('public/documents'));
app.set('view engine', 'ejs');


const routes = require('./routes');
app.use('/api/v1', routes);
app.get('/', showPic);
app.get('/:id', showPicById)

// 500 error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

// 404 error handler
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: `are you lost? ${req.method} ${req.url} is not registered!`,
        data: null
    });
});

module.exports = app;
