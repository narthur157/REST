var app = angular.module('ChatController', ['ChatService']);

app.controller('ChatController', function($scope, Chat) {
	$scope.text = "";
	var loaded = false;
	var lastReceivedText = "";
	io.on('getText', function(data) {
		
		loaded=true;
		console.log('from client: getText, loaded is ' + loaded);
		$scope.text = data.text;
		$scope.$apply();
	});
	io.emit('text:get');
	function sendChange() {
		if (loaded && lastReceivedText != $scope.text) {
			Chat.update($scope.text);
		}
	}

	$scope.$watch('text', sendChange);
});