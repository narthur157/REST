var app = angular.module('BearService', []);

app.factory('Bear', ['$http', '$q', function($http, $q) {

	return {
		get : function() {
			var deferred = $q.defer();
			io.emit('bears:get');
			io.on('bearsSent', function(bear) {
				deferred.resolve(bear);
			});
			return deferred.promise;
		},

		create : function(name) {
			io.emit('bears:create', { 'name': name });			
		},

		delete : function(id) {
			io.emit('bears:remove', { '_id': id });
		},

		update : function(id, name) {
			var bear = {
				'_id': id,
				'name': name
			};
			io.emit('bears:update', bear);
		}
	};
	
}]);