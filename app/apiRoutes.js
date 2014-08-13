

module.exports = function(app) {
	var School = require('./models/school');

	app.post('/api/schools', function(req, res) {

		var school = new School(); 		// create a new instance of the School model
		school.classes = req.body.school.classes;  // set the schools name (comes from the request)
		school.name = req.body.school.classes;

		// save the school and check for errors
		school.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'School created!' });
		});

	});
	app.get('/api/schools', function(req, res) {
		School.find(function(err, schools) {
			if (err)
				res.send(err);

			res.json(schools);
		});
	});
	app.get('/api/schools/:school_id', function(req, res) {
		School.findById(req.params.school_id, function(err, school) {
			if (err)
				res.send(err);
			res.json(school);
		});
	});
	app.put('/api/schools/:school_id', function(req, res) {
		School.findById(req.params.school_id, function(err, school) {

			if (err)
				res.send(err);
			var givenSchool = req.body.school;
			givenSchool._id = school._id;
			school = givenSchool;
			school.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'School updated!' });
			});
		});
	});
	app.delete('/api/schools/:school_id', function(req, res) {
		School.remove({
			_id: req.params.school_id
		}, function(err, school) {
			if (err)
				res.send(err);

			res.json({ message: 'School deleted' });
		});
	});
	app.get('/testing', function(req, res){ 
		res.sendfile('./public/test.html')
	});
	// dot-slash vulnerabilities and..ah whatever
	app.get('*', function(req, res) {
	    res.sendfile('./public/index.html')
	});

};