 // app/routes.js

	module.exports = function(app, router) {

		// server routes ===========================================================
		// handle things like api calls
		// authentication routes
		var Bear	   = require('./models/bear');
		// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
		router.get('/', function(req, res) {
			res.json({ message: 'hooray! welcome to our api!' });	
		});

		router.route('/bears')

			// create a bear (accessed at POST http://localhost:8080/api/bears)
			.post(function(req, res) {
				
				var bear = new Bear(); 		// create a new instance of the Bear model
				bear.name = req.body.name;  // set the bears name (comes from the request)

				// save the bear and check for errors
				bear.save(function(err) {
					if (err)
						res.send(err);

					res.json({ message: 'Bear created!' });
				});
				
			})

			// get all the bears (accessed at GET http://localhost:8080/api/bears)
			.get(function(req, res) {
				Bear.find(function(err, bears) {
					if (err)
						res.send(err);

					res.json(bears);
				});
			});

		router.route('/bears/:bear_id')

			.get(function(req, res) {
				Bear.findById(req.params.bear_id, function(err, bear) {
					if (err)
						res.send(err);
					res.json(bear);
				});
			})

			.put(function(req, res) {
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
			})

			.delete(function(req, res) {
				Bear.remove({
					_id: req.params.bear_id
				}, function(err, bear) {
					if (err)
						res.send(err);

					res.json({ message: 'Bear deleted' });
				});
			});
		// REGISTER OUR ROUTES -------------------------------
		// all of our routes will be prefixed with /api
		app.use('/api', router);

		// frontend routes =========================================================
		// route to handle all angular requests
		app.get('*', function(req, res) {
			res.sendfile('./public/index.html'); // load our public/index.html file
		});

	};