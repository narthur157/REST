var app = angular.module('appRoutes', []);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/notes', {
			templateUrl: 'views/notes.html',
			controller: 'NoteController'
		});
		
	$locationProvider.html5Mode(true);
}]);