// built into node.
var http = require('http'),
    fs = require('fs'),
    argv = require('optimist').argv,
    https = require('https'),
    Gun = require('gun'),
    Sea = require('gun/sea')
   // require('gun/lib/shim')
   // require('gun/lib/path')
   // require('gun/lib/bye')
    require('gun/nts')


// Create a new server instance.
//var server = http.createServer();

//var location = {host:"localhost"};
//var gun = Gun( { file: 'read.json', peers: ['http://' + location.host + ':8080/gun'] });
//gun.get( 'players' ).path('me4').put('from server',function(v){ console.log("put new value " + v ); } );
//gun.get('players').get('me4').bye().put('offline');
//gun.on('bye', function(peer){ console.log('disconnected from', peer) })


var ssl = ( argv.s  || argv.ssl );
var pass = ( ( argv.w) ? ( argv.w) : undefined );
var sslOptions = {
    key: ( ( argv.k || argv.key ) ? fs.readFileSync( argv.k || argv.key ) : undefined ),
    cert: ( ( argv.c || argv.cert ) ? fs.readFileSync( argv.c || argv.cert ) : undefined ),
    ca: ( ( argv.t || argv.ca ) ? fs.readFileSync( argv.t || argv.ca ) : undefined ),
    passphrase: JSON.stringify(pass)
};

//create the server
var port = ( ( argv.p || argv.port ) ? ( argv.p || argv.port ) : 8080 );

var srv = ssl ? https.createServer( sslOptions, OnRequest): http.createServer(OnRequest);
//console.log( 'Serving on port ' + port );

// Our GUN setup from the last example.
var gun = Gun({
    //file: 'data.json',
    //file: false,
    web: srv
});


function serve(request, response){

    response.writeHead( 200, {
        "Content-Type": "application/json"
    } );
    var jsonobject = {
        "db": "v0.0.2"
        //"instances": inst
    }
    response.write( JSON.stringify( jsonobject ), "utf8" );
    response.end();	
    //console.log("Serve here")

}

function OnRequest(request, response) {
    try {
        serve(request, response);
        // vwf.Serve( request, response );
       
    } catch (e) {
        response.writeHead(500, {
            "Content-Type": "text/plain"
        });
        response.write(e.toString(), "utf8");
        response.end();
    }
} // close onRequest


// Start the server on port 8080.
srv.listen(port, function () {
  console.log('Server listening on http://localhost:'+ port+ '/gun')
})
