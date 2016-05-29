require('./user');
require('./new');
var mongoose = require('mongoose');


exports.User = mongoose.model('users');
exports.New = mongoose.model('news');