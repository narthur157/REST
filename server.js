// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express.io');
var app = express();
app.http().io();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));  // vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8090; 		// set our port


// set up the routes
require('./app/routes')(app);

app.listen(port);
console.log('port ' + port);
exports = module.exports = app;