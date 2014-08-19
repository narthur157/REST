var app = angular.module('NoteController', ['FireFactory', 'firebase']);

app.controller('NoteController', ["$scope", 'FireFactory', "$firebase", function($scope, FireFactory, $firebase) {
	$scope.school = "Binghamton";
	$scope.classIdentifier = "CS350";
	$scope.lecture = "aLecture";
	$scope.authenticated = false;
	$scope.otherNotes = []
;	$scope.message = "";
	$scope.chatLog = "";

	


	// holds all sorts of nonsense
	var fireManager = FireFactory;

	fireManager.setup($scope.school, $scope.classIdentifier, $scope.lecture, function() {
		$scope.authenticated=true;
		$scope.$apply();
		var ref = new Firebase("https://burning-fire-602.firebaseio.com/web/data/");
		var sync = $firebase(ref);
		var syncObject = sync.$asObject();
		syncObject.$bindTo($scope, "data");
		var chatRef = new Firebase("https://burning-fire-602.firebaseio.com/web/data/" + $scope.school + "/" + $scope.classIdentifier + "/" + $scope.lecture + "/chat");
        var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));
        chat.setUser(fireManager.user.uid, fireManager.user.displayName);
	});
	$scope.otherNotes = fireManager.otherNotes;	// reference magic
	$scope.chatLog = fireManager.chatLog;
	//$scope.$watch('otherNotes', function() { console.log($scope.otherNotes); });
	$scope.login = function() {
		fireManager.authClient.login('google');
		if (fireManager.authClient) {
			$scope.authenticated = true;
			$scope.$apply();
		}
	};

	$scope.logout = function() {
		fireManager.authClient.logout();
		$scope.authenticated=false;
		$scope.$apply();
	};

	$scope.showNote = function(id) {
		console.log($scope.otherNotes);
		console.log(_.where($scope.otherNotes, { 'uid': id}));
		fireManager.getNote(id);
	};    

	$scope.sendMessage = function(message) {
		fireManager.sendChatMessage(message);
	};
}]);