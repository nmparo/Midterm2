var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/foos').get(function(req, res, next){
        logger.log('info', 'Get Foo');
        res.status(200).json({message: 'Got Foo'});

	});

    router.route('/foos/:id').get(function(req, res, next){
         logger.log('info','Get Foo %s', req.params.id)
         res.status(200).json({message: 'Get Foo: ' + req.params.id}); 
    }); 

    router.route('/foos').post(function(req, res, next){
        console.log(req.body);
        var foo = req.body.foo
        var woo = req.body.woo
        var DateDue = req.body.DateDue;

        var obj = {'foo' : foo, 'woo' : woo, 'DateDue' : DateDue};
        res.status(201).json(obj);
    });

    router.route('/foos').put(function(req, res, next){
        logger.log('info', 'Update Foo %s', req.params.id)
        res.status(200).json(result);
    });

    router.route('/foos').delete(function(req, res, next){
        logger.log('info', 'Delete Foo %s', req.params.id)
        res.status(200).json(result);
    });
        
};
