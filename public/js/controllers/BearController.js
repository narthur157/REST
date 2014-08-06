var app = angular.module('BearController', ['BearService']);

app.controller('BearController', function($scope, Bear) {
	$scope.bears = [];
	$scope.name = "";
	function updateBears() {
		Bear.get().then(function(resp) {
			$scope.bears=resp.data;
		});
	}
	$scope.makeBear = function() {
		//if ($scope.name != "")
			Bear.create($scope.name).then(updateBears);
	};
	$scope.deleteBear = function(id) {
		if (undefined !== id) Bear.delete(id).then(updateBears);
	};
	$scope.updateBear = function(id, name) {
		if (undefined !== id) Bear.update(id, name);
	};
	//$scope.$watch(bears)
	updateBears();
});
