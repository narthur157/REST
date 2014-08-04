// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var db = require('./config/db');
var mongoose   = require('mongoose');
mongoose.connect(db.url); // connect to our database
//db.on('error', console.error.bind(console, 'connection error:'));



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));  // vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8090; 		// set our port
var router = express.Router(); 				// get an instance of the express Router

router.use(function(req, res, next) {
	console.log('Requested: ' + req.url + '		Method: ' + req.method);
	next();
});
// just call the returned function
require('./app/routes')(app, router);

app.listen(port);
console.log('port ' + port);
exports = module.exports = app;