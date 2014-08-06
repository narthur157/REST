var app = angular.module('MainController', []);

app.controller('MainController', function($scope) {
	io.on('err', function(err) {
		console.log(err);
	});
});