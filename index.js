// var fs = require('fs'),
//     argv = require('optimist').argv

var argv = require('yargs').argv;
var config = require('./readConfig');

var Gun = require('gun')
require('gun/sea')
require('gun/lib/path')
require('gun/lib/not')
require('gun/nts')
require('gun/lib/bye')

config.readConfigFile();
var conf = config.parseConfigOptions();


var config = { port: conf.port };
//create the server

if (conf.ssl) {
    config.server = require('https').createServer(conf.sslOptions, Gun.serve(__dirname));
} else {
    config.server = require('http').createServer(Gun.serve(__dirname));
}

global.gun = Gun({ 
        web: config.server.listen(config.port),
        peers: [(`https://localhost:${config.port}/gun`)],
        multicast: false,
        radisk: true,
        axe: false}); //until: 5000, chunk: 10


//Sync all (not work for now)
//global.gun.on('out',{get: {'#': {'*': ''}}})

console.log('Relay peer started on port ' + config.port + ' with /gun');

// let tickMsg = {
//     parameters: "[]",
//     time: 'tick',//hb
//     sender: 'server'
// };

// global.gun.get('server').get('heartbeat').get('tick').put(tickMsg);

//instance.get('heartbeat').put({ tick: "{}" }).heartbeat(0.0, 1);

// setInterval(function () {

//     let message = {
//         parameters: "[]",
//         time: 'tick', //hb
//         sender: 'server'
//     };

//     global.gun.get('server').get('heartbeat').get('tick').put(message,function(ack){
//         if(ack.err){ 
//             //console.log('ERROR: ' + ack.err)
//         }});

// }, 50);