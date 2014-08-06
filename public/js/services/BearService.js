var app = angular.module('BearService', []);

app.factory('Bear', ['$http', '$q', function($http, $q) {

	return {
		get : function() {
			var deferred = $q.defer();
			io.emit('bears:get'); //return $http.get('/api/bears');
			console.log("getting bears");
			io.on('bearsSent', function(bear) {
				console.log("bearsSent", bear);
				deferred.resolve(bear);
			});
			return deferred.promise;
		},

		create : function(name) {
			io.emit('bears:create', { 'name': name });			
		},

		delete : function(id) {
			io.emit('bears:remove', { '_id': id });
			//return $http.delete('/api/bears/' + id);
		},

		update : function(id, name) {
			var bear = {
				'_id': id,
				'name': name
			};
			io.emit('bears:update', bear);
			//return $http.put('/api/bears/' + id, name);
		}
	};
	
}]);