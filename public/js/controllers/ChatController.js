var app = angular.module('ChatController', ['ChatService']);

app.controller('ChatController', function($scope, Chat) {
	$scope.text = "";
	$scope.queue = 0;
	var loaded = false;
	io.on('getText', function(data) {
		loaded=true;
		if ($scope.queue === 0) {
			$scope.text = data.text;
			$scope.$apply();
		}
	});
	io.emit('text:get');
	function sendChange() {
		if (loaded) {
			$scope.queue++;
			Chat.update($scope.text);
		}
	}

	$scope.$watch('text', sendChange);
});