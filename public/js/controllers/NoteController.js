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
	var otherNotes = [];
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

				var baseUri = "https://burning-fire-602.firebaseio.com/web/data/" + $scope.school + "/" + $scope.classIdentifier + "/" + $scope.lecture;
				outerRef = new Firebase(baseUri);
				var query = outerRef.startAt();
				query.once("value", function(notesSnapshot) {
					var val = notesSnapshot.val();
					console.log(val);
					_.forEach(_.keys(val),function(key) {
						console.log(key);
						var newRef = new Firebase(baseUri + "/" + key);
						if (key !== usr.uid) {
							init(key, key, newRef);
							otherNotes.push(newRef);
						}		
					});
				});

				firepadRef = new Firebase(baseUri + "/" + usr.uid);
				init('usersPad', usr.uid, firepadRef);

			}
		});
	$scope.login = function() {
		authClient.login('google');
	};
	$scope.logout = function() {
		authClient.logout();
		authenticated=false;
	};
	function init(cssId, usrId, fireRef) {		
		//// Create CodeMirror (with lineWrapping on).
		// this needs to create rather than get it seems
		var element = document.createElement('div');
		element.id = cssId;
		// YOLO ANTIPATTERN LIVE FAST DIE YOUNG #IDGAF #WINNING #SCREWTHEPATTERN #YEEEEEEEEEEEEEEEEEEEEEEEEAH #LOOKSLIKEAPYTHONCOMMENT
		document.getElementById('contentDiv').appendChild(element);
		console.log(element);
		console.log(cssId);
		console.log(fireRef);
		
		var codeMirror = CodeMirror(document.getElementById(cssId), { lineWrapping: true });
		//// Create Firepad (with rich text toolbar and shortcuts enabled).
		var myNotes = Firepad.fromCodeMirror(fireRef, codeMirror,
			{ richTextToolbar: true, richTextShortcuts: true, userId: usrId });

		//// Initialize contents.
		myNotes.on('ready', function() {

		});
    }
    
});

