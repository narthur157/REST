var app = angular.module('SchoolService', []);

app.factory('School', ['$http', '$q', function($http, $q) {

	return {
		get : function() {
			return $http.get('/api/schools');
		},

		create : function(school) {
			return $http.post('/api/schools', school)
		},

		delete : function(id) {
			return $http.delete('/api/schools/' + id);
		},

		update : function(id, school) {
			return $http.put('/api/schools/' + id, name);
		}
	};
	
}]);