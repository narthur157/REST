

module.exports = function(app) {
	app.get('/test', function(req, res) {
		res.sendfile('./public/test.html');
	});
	app.get('*', function(req, res) {
	    res.sendfile('./public/index.html');
	});
};