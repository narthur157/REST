var app = angular.module('realtimeNote', []);

app.directive('realtimeNote', function() {
	return {
		restrict: 'E',
		scope: {
			editor: '=editor'
		},
		template: 'realtimeNote.html'
	};
});