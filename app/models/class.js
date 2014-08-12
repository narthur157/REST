var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Lecture 	 = require('./lecture');
var ClassSchema = new Schema({
	name: String,
	lectures: [Lecture]
});

module.exports = mongoose.model('Class', ClassSchema);