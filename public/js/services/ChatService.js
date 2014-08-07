var app = angular.module('ChatService', []);

app.factory('Chat', function() {
	return {
		update: function(text) {
			io.emit('text:update', { 'text': text });
		}
	};
});