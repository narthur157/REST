var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Note 		 = require('./note');
var LectureSchema = new Schema({
	notes: [Note],
	time: String
});

module.exports = mongoose.model('Lecture', LectureSchema);