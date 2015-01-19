var app = angular.module('FireFactory', []);

app.factory('FireFactory', function($q) {

	var _rootUri = "https://burning-fire-602.firebaseio.com/web/data/";
	var _lectureUri = null;
	var _noteUri = null;

	var service = {};

	service.user = null;

	service.authClient = null;

	service.rootRef = null;

	service.lectureRef = null;
	
	service.userRef = null;

	service.selectedRef = null;

	service.noteRef = null;

	service.authClient = null;

	service.chatLog = [];

	service.otherNotes = [];
	function makeNoteModel(snapshot) {
		// snapshot must be of the note
		var deferred = $q.defer();
		getNameFromId(snapshot.name()).then(function(displayName) {
			deferred.resolve({
					'uid': snapshot.name(),
					'displayName': displayName,
					'note': snapshot.val()
				});
		});
		return deferred.promise;
	}
	function setupConnections(callback) {

		service.noteRef.on('child_added', function(snapshot) {
			if (snapshot.name() !== service.user.uid) {
				makeNoteModel(snapshot).then(function(note) {
					console.log('new child! congratulations!');
					service.otherNotes.push(note);
				});
			}
		});

		service.lectureRef.child('chat').on('child_added', function(snapshot) {
			var message = snapshot.val();
			service.chatLog.push(
				{
					user: message.user,
					text: message.text,
					time: message.time
				}
			);
		});

		service.userRef = new Firebase(_noteUri + "/" + service.user.uid);
		service.createPad('usersPad', service.user.uid, service.userRef);
		callback();
	}
	function getNameFromId(id) {
		var deferred = $q.defer();
		if (!service.lectureRef) throw "LectureRefNull";
		if (!id) throw "getNameFromIdNullId";
		service.rootRef.child('users').startAt().once('value', function(snapshot) {
			snapshot.forEach(function(userSnapshot) {
				var val = userSnapshot.val();
				var uid = val.provider +':' + val.provider_id;
				if (uid === id) {
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
		
		var codeMirror = CodeMirror(document.getElementById(cssId), 
			{ 
				lineWrapping: true, 
				readOnly: !canEditPad,
			}
		);
		//// Create Firepad (with rich text toolbar and shortcuts enabled).
		var myNotes = Firepad.fromCodeMirror(fireRef, codeMirror,
			{ richTextToolbar: canEditPad, richTextShortcuts: canEditPad, userId: usrId });
		return {
			firePadRef: myNotes,
			codeMirrorRef: codeMirror
		};
	};
	service.getNote = function(selectedNoteId) {

		this.selectedRef = new Firebase(_noteUri + "/" + selectedNoteId);
		this.createPad(selectedNoteId, selectedNoteId, this.selectedRef);
	};

	service.setup = function(school, classIdentifier, lecture, success) {
		
		_lectureUri = _rootUri + school + "/" + classIdentifier + "/" + lecture;
		_noteUri = _lectureUri + "/notes";
		this.rootRef = new Firebase(_rootUri);
		this.lectureRef = new Firebase(_lectureUri);
		this.noteRef = new Firebase(_noteUri);

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

				service.user = usr;
				setupConnections(success);
			}
			else {
				console.log("weird stuff happening");
				console.log(service.lectureRef);
			}
		});
	};
	service.sendChatMessage = function(message) {
		this.lectureRef.child('chat').push(
			{
				user: this.user.displayName,
				text: message,
				time: 1
			}
		);
	};
	//service.createLectures;
	return service;
});