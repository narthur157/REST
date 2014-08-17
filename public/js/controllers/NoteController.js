var app = angular.module('NoteController', ['FireFactory']);

app.controller('NoteController', function($scope, FireFactory) {
	$scope.school = "Binghamton";
	$scope.classIdentifier = "CS350";
	$scope.lecture = "aLecture";
	$scope.authenticated = false;
	$scope.otherNotes = [];

	// holds all sorts of nonsense
	var fireManager = FireFactory;
	fireManager.setup($scope.school, $scope.classIdentifier, $scope.lecture);
	$scope.otherNotes=fireManager.otherNotes;	// reference magic
	console.log($scope.otherNotes);
	$scope.$watch('otherNotes', function() { console.log($scope.otherNotes); });
	$scope.login = function() {
		fireManager.authClient.login('google');
		if (fireManager.authClient) $scope.authenticated = true;
	};

	$scope.logout = function() {
		fireManager.authClient.logout();
		$scope.authenticated=false;
	};

	$scope.showNote = function(id) {
		fireManager.getNote(id);
	};    
});