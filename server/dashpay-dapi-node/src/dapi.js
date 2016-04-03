'use strict';

// npm packages
var log = require('./util/log');
var express = require('express');
var async = require('async');
var cors = require('cors');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var morgan = require('morgan');
var config = require('../config/config');
var https = require('https');
var fs = require('fs');

// Dash packages
var Dash = require('../../../lib/dashpay-lib');

// routes
var SignupRouter = require('./routers/signup');
var LoginRouter = require('./routers/login');
var UserRouter = require('./routers/user');
var PublicRouter = require('./routers/public');
var DebugRouter = require('./routers/debug');

// DAPI startup sequence
async.waterfall([
    function initExpressApp(callback) {
        // setup express
        var app  = express();
        log.info('DAPI starting...');

        // BodyParser for getting POST/GET params
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        // Morgan for request logging
        app.use(morgan('dev'));

        // Cross-origin resource sharing
        app.use(cors());

        // Data Config
        mongoose.connect(config.database);
        app.set('mnkey', config.secret);

        // Ensure TLS requests
        app.use(function (req, res, next) {
            if (!req.secure) {
                log.info('Denied request: insecure');
                res.sendStatus(401);
            } else {
                log.info('Allowed TLS request from:' + req.hostname + ',' + req.ip + ' to ' + req.path);
                next();
            }
        });
        callback(null, app);
    },
    function initAuthRouter(app, callback) {
        log.info('Starting Auth Router');
        var loginRouter = new LoginRouter(app);
        callback(null, app);
    },
    function initUserRouter(app, callback) {
        log.info('Starting User Router');
        var userRouter = new UserRouter(app);
        callback(null, app);
    },
    function initSignupRouter(app, callback) {
        log.info('Starting Signup Router');
        var signupRouter = new SignupRouter(app);
        callback(null, app);
    },
    function initPublicRouter(app, callback) {
        log.info('Starting Public Router');
        var publicRouter = new PublicRouter(app);
        callback(null, app);
    },
    function initDebugRouter(app, callback) {
        log.info('Starting Debug Router');
        var debugRouter = new DebugRouter(app);
        callback(null, app);
    },
    function initWebSockets(app, callback) {
        //logger.info('Starting Socket services');
        //var io = socketio.listen(server);
        //new SocketService(io);
        callback(null, app);
    },
    function initHTTPSServer(app, callback) {
        log.info('Starting HTTPS server');

        // test to create internal server error to check stacktrace isn't dumped to the response..
        app.get('/error', function (req, res) { throw new Error();});

        // production error handler, release version will have this removed from NodeJS itself.
        //app.use(function(err, req, res, next) { log.info('DAPI error: ' + err); res.sendStatus(500); });

        // Load SSL keys
        var pkey = fs.readFileSync('ssl/ssl-key.pem');
        var pcert = fs.readFileSync('ssl/ssl-cert.pem');
        var httpsOptions = { key: pkey, cert: pcert };

        // Start the HTTPS server...
        var port = Dash.lib.config.dapiPort;
        var server = https.createServer(httpsOptions, app).listen(port, function () {
            var address = Dash.lib.config.dapiURL;
            log.info('DAPI listening at ' + address + ':' + server.address().port + '/');
        });
        callback(null);
    }
], function (err) {
    if (err) {
        log.info('DAPI could not start: ', err);
        process.kill();
        return;
    }
    log.info('DAPI started successfully');
});