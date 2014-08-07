var app = angular.module('MainController', []);

app.controller('MainController', function($scope) {
	// going to be more of a logging controller for now
	io.on('err', function(err) {
		console.log(err);
	});
	io.on('log', function(message) {
		console.log('from server: ' + message);
	});
});