var mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost/yanghang');
var Schema    = mongoose.Schema;

var UserSchema = new Schema({
	userid: { type: String},
	password: { type: String}
});

mongoose.model('users', UserSchema);


