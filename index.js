var fs = require('fs'),
    argv = require('optimist').argv

var Gun = require('gun')
        require('gun/sea')
        require('gun/lib/path')
        require('gun/lib/not')
        require('gun/nts')

var ssl = ( argv.s  || argv.ssl );
var pass = ( ( argv.w) ? ( argv.w) : undefined );
var sslOptions = {
    key: ( ( argv.k || argv.key ) ? fs.readFileSync( argv.k || argv.key ) : undefined ),
    cert: ( ( argv.c || argv.cert ) ? fs.readFileSync( argv.c || argv.cert ) : undefined ),
    ca: ( ( argv.t || argv.ca ) ? fs.readFileSync( argv.t || argv.ca ) : undefined ),
    passphrase: JSON.stringify(pass)
};
var port = ( ( argv.p || argv.port ) ? ( argv.p || argv.port ) : 8080 );


var config = { port: port };
//create the server

if(ssl){
    config.key = sslOptions.key;
    config.cert = sslOptions.cert;
    config.server = require('https').createServer(config, Gun.serve(__dirname));
} else {
    config.server = require('http').createServer(Gun.serve(__dirname));
}

global.gun = Gun({web: config.server.listen(config.port)}); //until: 5000, chunk: 10
console.log('Relay peer started on port ' + config.port + ' with /gun');