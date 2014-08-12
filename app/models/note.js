var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;
var NoteSchema = new Schema({
	id: String
});

module.exports = mongoose.model('Note', NoteSchema);