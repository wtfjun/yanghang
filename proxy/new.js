var models = require('../models');
var New = models.New;

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

/**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} loginName 登录名
 * @param {Function} callback 回调函数
 */
exports.createANew = function (title, desc, author_id) {
  var aNew = new New({ 
  	title: title,
  	desc: desc,
    author_id: author_id
  });

	aNew.save(function (err) {
	  if (err) return handleError(err);
    console.log(title + desc + author_id);
	  // saved!
	});
};

//删除新闻
exports.delNews = function(id) {
  New.findById(id, function (err, news){
    
    if(!err) {
      console.log(news.title);
      news.remove();
    }
  });
}

//编辑新闻
exports.reNews = function(id, title, desc) {
  console.log(id);
  New.update({_id: id},{
      $set: {desc : desc,title: title},
    },{safe: false, multi: true}, function(err,doc) {
    if(!err && doc) {
    console.log('修改成功');
    } ;
    });
}

exports.limitNews = function(page,perPage,callback) {
//获取总数
  New.count({}, function (err, count) {
  //获取列表
    New.find({}).sort({'_id':-1}).skip((page-1)*perPage).limit(perPage).exec(function(err,doc){
        
        var d= [];
        d.data = doc;
        d.count = count;
        callback(err,d);

    })
});
}

/*查询所有新闻
exports.findAllNews = New.find(function(err, docs) {
  if(err) {
    return handleError(err);
  }
  return docs;
})*/

