var app = angular.module('ChatController', ['ChatService']);

app.controller('ChatController', function($scope, Chat) {
	$scope.text = "";

	io.on('textUpdated', function(data) {
		$scope.text = data.text;
		$scope.$apply();
	});
	function sendChange() {
		console.log("???");
		Chat.update($scope.text);
	}

	$scope.$watch('text', sendChange);
});