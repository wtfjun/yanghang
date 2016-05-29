var models = require('../models');
var User = models.User;

/**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} loginName 登录名
 * @param {Function} callback 回调函数
 */
exports.getUserByUseridAndPassword = function (userid, password, callback) {
  User.findOne({'userid': userid, 'password': password}, callback);
};



/**
 *添加新用户
 *
 */
exports.newAndSave = function (userid, password, callback) {
  var user         = new User();
  user.userid      = userid;
  user.password    = password;
  
  user.save(callback);
};