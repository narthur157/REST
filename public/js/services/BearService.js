var app = angular.module('BearService', []);

app.factory('Bear', ['$http', function($http) {

	return {
		get : function() {
			return $http.get('/api/bears');
		},

		create : function(name) {
			return $http.post('/api/bears', {'name': name});
		},

		delete : function(id) {
			return $http.delete('/api/bears/' + id);
		},

		update : function(id, name) {
			return $http.put('/api/bears/' + id, name);
		}
	}
	
}]);