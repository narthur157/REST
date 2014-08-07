var app = angular.module('appRoutes', []);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'
		})

		.when('/bears', {
			templateUrl: 'views/bear.html',
			controller: 'BearController'
		})

		.when('/chat', {
			templateUrl: 'views/chat.html',
			controller: 'ChatController'
		});

	$locationProvider.html5Mode(true);
}]);