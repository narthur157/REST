var app = angular.module('appRoutes', []);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/bears', {
			templateUrl: 'views/bear.html',
			controller: 'BearController'
		});
		
	$locationProvider.html5Mode(true);
}]);