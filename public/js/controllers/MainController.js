var app = angular.module('MainController', []);

app.controller('MainController', function($scope) {
	// do some logging/report errors from mongo
	io.on('err', function(err) {
		console.log(err);
	});
	io.on('log', function(message) {
		console.log('from server: ' + message);
	});
});