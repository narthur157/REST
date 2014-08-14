var app = angular.module('NoteController', []);

app.controller('NoteController', function($scope) {
	$scope.school = "Binghamton";
	$scope.classIdentifier = "CS350";
	$scope.lecture = "aLecture";
	$scope.authenticated = false;
	$scope.newSchool = function() {

	};
	var firepadRef = new Firebase("https://burning-fire-602.firebaseio.com/web/data/");
	var outerRef = null;
	var usr = null;
	var otherNotes = null;
	var authClient = new FirebaseSimpleLogin(firepadRef, function(error, user) {
			if (error) 
				console.log(error);
			if (user) {
				console.log("hello, " + user.displayName);
				firepadRef.child('users').child(user.uid).set({
					displayName: user.displayName,
					provider: user.provider,
					provider_id: user.id
				});
				usr = user;
				$scope.authenticated = true;
				$scope.$apply();
				console.log($scope.authenticated);
				var baseUri = "https://burning-fire-602.firebaseio.com/web/data/" + $scope.school + "/" + $scope.classIdentifier + "/" + $scope.lecture;
				outerRef = new Firebase(baseUri);
				var query = outerRef.startAt();
				query.once("value", function(notesSnapshot) {
					notesSnapshot.forEach(function(val) {
						console.log(val);
					});
				});

				firepadRef = new Firebase(baseUri + "/" + usr.uid);
				init('usersPad', usr.uid);

			}
		});
	$scope.login = function() {
		authClient.login('google');
	};
	function init(cssId, usrId) {		
		//// Create CodeMirror (with lineWrapping on).
		// this needs to create rather than get it seems
		var element = document.createElement('div');
		element.id = cssId;
		var codeMirror = CodeMirror(document.getElementById(cssId), { lineWrapping: true });
		//// Create Firepad (with rich text toolbar and shortcuts enabled).
		var myNotes = Firepad.fromCodeMirror(firepadRef, codeMirror,
			{ richTextToolbar: true, richTextShortcuts: true, userId: usrId });

		//// Initialize contents.
		myNotes.on('ready', function() {

		});
    }
    
});

