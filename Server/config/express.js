var express = require('express');
var morgan = require('morgan');
var logger = require('./logger');
var bodyParser = require('body-parser');

module.exports = function (app, config) {

    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));

        app.use(function (req, res, next) {
            logger.log('Request from ' + req.connection.remoteAddress, 'info');
            next();
        });
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(express.static(config.root + '/public'));

    var users = [{ foo: 'John', woo: '123', DateDue: '10/11/2018' },
    { foo: 'Betty', woo: '234', DateDue: '11/15/2018' },
    { foo: 'Hal', woo: '235', DateDue: '12/17/2018' }
    ];

    app.get('/api/foos', function (req, res) {
        res.status(200).json(foos);
    });

    require('../app/controllers/users')(app, config);

    app.use(function (req, res) {
        logger.log('error', 'File not found');
        res.type('text/plan');
        res.status(404);
        res.send('404 Not Found');
    });

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.type('text/plan');
        res.status(500);
        res.send('500 Sever Error');
    });

    logger.log('info', "Starting application");

};