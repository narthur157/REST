var app = angular.module('BearController', ['BearService']);

app.controller('BearController', function($scope, Bear) {
	$scope.bears = [];
	$scope.name = "";
	io.on('bearsUpdated', function(bears) {
		console.log('update broadcast received: ' + bears);
		$scope.bears = bears;
		$scope.$apply();
	});
	function updateBears() {
		Bear.get().then(function(resp) {
			$scope.bears=resp;
		});
	}
	$scope.makeBear = function() {
		Bear.create($scope.name);
		$scope.name = "";
	};
	$scope.deleteBear = function(id) {
		if (undefined !== id) Bear.delete(id);
	};
	$scope.updateBear = function(id, name) {
		if (undefined !== id) Bear.update(id, name);
	};
	//$scope.$watch(bears)
	updateBears();
});
