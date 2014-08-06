

module.exports = function(app) {
	var Bear = require('./models/bear');

	app.post('/api/bears', function(req, res) {

		var bear = new Bear(); 		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)

		// save the bear and check for errors
		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});

	});
	app.get('/api/bears', function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});
	app.get('/api/bears/:bear_id', function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	});
	app.put('/api/bears/:bear_id', function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err);
			bear.name = req.body.name;

			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});
		});
	});
	app.delete('/api/bears/:bear_id', function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear deleted' });
		});
	});
	//app.use('/api')
	app.get('*', function(req, res) {
	    res.sendfile('./public/index.html')
	});

};