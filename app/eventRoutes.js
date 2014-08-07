module.exports = function(app) {
	var Bear = require('./models/bear');
	var text = "";

	app.io.route('ready', function (req) {
		req.io.emit('talk', {
			message: 'io event'
		});
	});
	function textUpdated() {
		console.log("text changed to: " + text);
		app.io.broadcast('textUpdated', { 'text': text });
	}
	app.io.route('text', {
		update: function(req) {
			text = req.data.text;
			textUpdated();
		}
	});
	function bearsUpdated() {
		Bear.find(function(err, bears) {
			console.log("Broadcast update bears sent");
			if (err)	// this is a really bad error to get
				app.io.broadcast('err', err);
			app.io.broadcast('bearsUpdated', bears)
		});
	}
	app.io.route('bears', {
		create: function(req) {
			var bear = new Bear();
			bear.name = req.data.name;

			bear.save(function(err) {
				if (err)
					req.io.emit('err', err);
				bearsUpdated(req);
			});
		},
		get: function(req) {
			console.log("server get bears");
			Bear.find(function(err, bears) {
				// if (err)
				// 	req.io.emit('err', err);
				req.io.emit('bearsSent', bears);
			});
		},
		update: function(req) {
			Bear.findById(req.params.bear_id, function(err, bear) {
				bear.name = req.data.name;

				bear.save(function(err) {
					if (err) 
						req.io.emit('err', err);
					bearsUpdated(req);
				});
			});
		},
		remove: function(req) {
			Bear.remove({
				_id: req.data._id
			}, function(err, bear) {
				if (err)
					req.io.emit('err', err);
				bearsUpdated(req);
			});

		},
	});
	app.io.route('bearMade', bearsUpdated);
	app.io.route('bears', function(req) {
		req.io.emit('sendBears', {
			bear: req.data
		});
	});
	app.io.route('logging', function(req) {
		// basic logging is very very helpful
		console.log('Requested: ' + req.url + '		Method: ' + req.method);
		console.log('Req.body: %j', req.body);
		req.io.respond({hello: '???'});
	});
};