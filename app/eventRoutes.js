module.exports = function(app) {
	app.io.route('ready', function (req) {
		req.io.emit('talk', {
			message: 'io event'
		});
	});
	app.io.route('logging', function(req) {
		// basic logging is very very helpful
		console.log('Requested: ' + req.url + '		Method: ' + req.method);
		console.log('Req.body: %j', req.body);
		req.io.respond({hello: '???'});
	});
};