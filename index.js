// var fs = require('fs'),
//     argv = require('optimist').argv

var config = require('./readConfig');

var Gun = require('gun')
require('gun/sea')
require('gun/lib/path')
require('gun/lib/not')
require('gun/nts')

config.readConfigFile();
var conf = config.parseConfigOptions();


var config = { port: conf.port };
//create the server

if (conf.ssl) {
    config.server = require('https').createServer(conf.sslOptions, Gun.serve(__dirname));
} else {
    config.server = require('http').createServer(Gun.serve(__dirname));
}

global.gun = Gun({ web: config.server.listen(config.port), axe: false }); //until: 5000, chunk: 10
console.log('Relay peer started on port ' + config.port + ' with /gun');