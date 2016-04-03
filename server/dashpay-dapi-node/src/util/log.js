'use strict';

var winston = require('winston');

var config = {
    levels: {
        verbose: 1,
        info: 2,
        data: 3,
        warn: 4,
        debug: 5,
        error: 6
    },
    colors: {
        verbose: 'cyan',
        info: 'green',
        data: 'grey',
        warn: 'yellow',
        debug: 'blue',
        error: 'red'
    }
};

var logger = module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ level: 'info' }),
        new (winston.transports.File)({ filename: 'dapi.log',
            maxsize: 104857600,
            maxFiles: 3,
            level: 'info'
        })
    ],
    levels: config.levels,
    colors: config.colors
});
