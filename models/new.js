var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var NewSchema = new Schema({
	title: { type: String},
	desc: { type: String},
	imgSrc: {type: String},
	author_id: { type: String },
	create_at: { type: Date, default: Date.now }
});

mongoose.model('news', NewSchema);