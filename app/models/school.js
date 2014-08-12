var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;
var Class = require('./class');
var SchoolSchema = new Schema({
	classes: [Class],
	name: String
});

module.exports = mongoose.model('School', SchoolSchema);