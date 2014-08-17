var app = angular.module('FireFactory', []);

app.factory('FireFactory', function($q) {

	var _rootUri = "https://burning-fire-602.firebaseio.com/web/data/";
	var _lectureUri = null;

	var service = {};

	service.user = null;

	service.authClient = null;

	service.rootRef = null;

	service.lectureRef = null;
	
	service.userRef = null;

	service.selectedRef = null;

	service.authClient = null;

	service.otherNotes = [];
	function makeNoteModel(snapshot) {
		// snapshot must be of the note
		var deferred = $q.defer();
		getNameFromId(snapshot.name()).then(function(displayName) {
			console.log('resolving note');
			deferred.resolve({
					'uid': snapshot.name(),
					'displayName': displayName,
					'note': snapshot.val()
				});
		});
		return deferred.promise;
	}
	function setupConnections() {

		service.lectureRef.on('child_added', function(snapshot) {
			if (snapshot.name() !== service.user.uid) {
				makeNoteModel(snapshot).then(function(note) {
					service.otherNotes.push(note);
				});
			}
		});

		service.userRef = new Firebase(_rootUri + "/" + service.user.uid);
		service.createPad('usersPad', service.user.uid, service.userRef);
	}
	function getNameFromId(id) {
		var deferred = $q.defer();
		if (!service.lectureRef) throw "LectureRefNull";
		if (!id) throw "getNameFromIdNullId";
		service.rootRef.child('users').startAt().once('value', function(snapshot) {
			snapshot.forEach(function(userSnapshot) {
				var val = userSnapshot.val();
				var uid = val.provider +':' + val.provider_id;
				console.log(uid + ' : ' + id);
				if (uid === id) {
					console.log('resolving name');
					deferred.resolve(val.displayName);
				}
			});
		});
		return deferred.promise;
	}
	service.createPad = function(cssId, usrId, fireRef) {

		//// Create CodeMirror (with lineWrapping on).
		var canEditPad = false;
		if (cssId === 'usersPad')
			canEditPad=true;
		var element = document.createElement('div');
		element.id = cssId;
		// YOLO ANTIPATTERN LIVE FAST DIE YOUNG #IDGAF #WINNING #SCREWTHEPATTERN #YEEEEEEEEEEEEEEEEEEEEEEEEAH #LOOKSLIKEAPYTHONCOMMENT
		document.getElementById('contentDiv').appendChild(element);
		// console.log(element);
		// console.log(cssId);
		// console.log(fireRef);
		
		var codeMirror = CodeMirror(document.getElementById(cssId), 
			{ 
				lineWrapping: true, 
				readOnly: !canEditPad,
			}
		);
		//// Create Firepad (with rich text toolbar and shortcuts enabled).
		var myNotes = Firepad.fromCodeMirror(fireRef, codeMirror,
			{ richTextToolbar: canEditPad, richTextShortcuts: canEditPad, userId: usrId });
	};
	service.getNote = function(selectedNote) {

		this.selectedRef = new Firebase(_rootUri + "/" + this.user.uid);
		this.createPad(selectedNote, selectedNote, this.selectedRef);
	};

	service.setup = function(school, classIdentifier, lecture) {
		
		_lectureUri = _rootUri + school + "/" + classIdentifier + "/" + lecture;
		
		this.rootRef = new Firebase(_rootUri);
		this.lectureRef = new Firebase(_lectureUri);

		service.authClient = new FirebaseSimpleLogin(this.lectureRef, function(error, usr) {
			if (error) {
				console.log(error);
				return null;
			}
			if (usr) {
				console.log("hello, " + usr.displayName);
				// no access to service here
				service.rootRef.child('users').child(usr.uid).set({
					displayName: usr.displayName,
					provider: usr.provider,
					provider_id: usr.id
				});
				service.lectureRef.startAt().once('value', function(snapshot) {
					snapshot.forEach(function(noteSnapshot) {
						var promise = makeNoteModel(noteSnapshot);
						console.log(promise);
						promise.then(function(note) {
								service.otherNotes.push(note);
								console.log(service.otherNotes);
						});
					});
				});
				service.user = usr;
				setupConnections();
			}
			else {
				console.log("weird stuff happening");
				console.log(service.lectureRef);
			}
		});
	};
	return service;
});