var app = angular.module('NoteController', ['textAngular']);

app.controller('NoteController', function($scope, $element) {
	$scope.text = null;
	// $scope.content = "";
	// $scope.$watch('content', function() {
	// 	console.log($scope.content);
	// });
	/**
     * Options for the Realtime loader.
     */
    var realtimeOptions = {
      /**
       * Client ID from the console.
       */
      clientId: '115418830538-hommjv05ogfj66d8n76kq2dcjambq54j.apps.googleusercontent.com',

      /**
       * The ID of the button to click to authorize. Must be a DOM element ID.
       */
      authButtonElementId: 'authorizeButton',

      /**
       * Function to be called when a Realtime model is first created.
       */
      initializeModel: initializeModel,

      /**
       * Autocreate files right after auth automatically.
       */
      autoCreate: true,

      /**
       * The name of newly created Drive files.
       */
      defaultTitle: "New Realtime Quickstart File",

      /**
       * The MIME type of newly created Drive Files. By default the application
       * specific MIME type will be used:
       *     application/vnd.google-apps.drive-sdk.
       */
      newFileMimeType: null, // Using default.

      /**
       * Function to be called every time a Realtime file is loaded.
       */
      onFileLoaded: onFileLoaded,

      /**
       * Function to be called to inityalize custom Collaborative Objects types.
       */
      registerTypes: null, // No action.

      /**
       * Function to be called after authorization and before loading files.
       */
      afterAuth: null // No action.
    };
    function initializeModel(model) {
      var string = model.createString('Hello Realtime World!');
      model.getRoot().set('text', string);
    }
        /**
     * This function is called when the Realtime file has been loaded. It should
     * be used to initialize any user interface components and event handlers
     * depending on the Realtime model. In this case, create a text control binder
     * and bind it to our string model that we created in initializeModel.
     * @param doc {gapi.drive.realtime.Document} the Realtime document.
     */
    function onFileLoaded(doc) {
      var obj = doc.getModel().getRoot().get('text');

      // Keeping one box updated with a String binder.
      var textArea = Note();
      gapi.drive.realtime.databinding.Binding(obj, textArea);
      
      $scope.$watch('obj', function() {
      	$scope.text1 = $scope.obj;
      });

      // Enabling UI Elements.
      textArea.disabled = false;
    }

    function startRealtime() {
      var realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
      realtimeLoader.start();
    }
    //
    startRealtime();
});