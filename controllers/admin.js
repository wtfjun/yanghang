var User  = require('../proxy').User;
var validator = require('validator');
var eventproxy = require('eventproxy');

var authMiddleWare = require('../middlewares/auth');
var New = require('../proxy').New;
var models = require('../models');
var multiparty = require('multiparty');
var fs = require('fs');
var util = require('util');
var mongoose = require('mongoose');
var session = require('express-session');
var NewSchema = models.New;

//后台主界面
exports.showIndex = function(req, res, next) {
  if(!req.session.user) {
    res.redirect('/adminLogin');
  }
  var page = req.query.p;
  var perPage = (req.query.pr)?req.query.pr:3;

  New.limitNews(page,perPage,function (err, news) {
    if (err) {
        return next(err);
    }
    //console.log(news);
    //news.data.desc = htmlDecode(news.data.desc);
    res.render('admin/index', {
      
      allNews: news.data,
      current_page: page,
      count:news.count
    });
  });
}

//后台登陆界面
exports.showLogin = function(req, res) {
	res.render('admin/login', {
		user: req.session.user
	});
}

//后台添加新闻界面
exports.showAddNews = function(req, res) {
	res.render('admin/addNews', {
		user: req.session.user
	});
}
//后台添加新闻操作
exports.addNewsAction = function(req, res) {
  var title = req.body.title;
  var desc = req.body.desc;
  var author_id = req.body.user;
  
  New.createANew(title, desc, author_id);
  res.redirect('/admin');
}
//删除新闻
exports.delNewsAction = function(req, res) {
  New.delNews(req.query.id);
  res.redirect('/admin');
}
//修改新闻动作
exports.reNewsAction = function(req, res) {
  New.reNews(req.body.id, req.body.title, req.body.desc);
  res.redirect('admin');
}
//修改新闻界面
exports.showReNews = function(req, res) {
  if(!req.session.user) {
    res.redirect('/adminLogin');
  }
  res.render('admin/reNews', {
    id: req.query.id,
    title: req.query.title,
    desc: req.query.desc
  });
}
//后台登陆操作
exports.login = function (req, res, next) {
  var userid = validator.trim(req.body.userid).toLowerCase();
  var password = validator.trim(req.body.password);
  var ep = new eventproxy();

  ep.fail(next);

  if (!userid || !password) {
    res.status(422);
    return res.render('admin/login', { title: '用户登陆', error: '信息不完整。' });
  }

  var getUser = User.getUserByUseridAndPassword;

  ep.on('login_error', function (login_error) {   //绑定一个login_error事件
    res.status(403);
    res.render('admin/login', { title: '用户登陆', error: '用户名或密码错误' });
  });
 
  getUser(userid, password, function(err, user) {
    if(user) {   
      // store session cookie
      authMiddleWare.gen_session(user, res);
      req.session.user = userid;
      //var UserModel  = mongoose.model('users');
      
      
      res.redirect('/admin');
    }
    else {
      res.render('admin/login', {
        title: '用户登陆',
        error: '账号或密码错误'
      });
    }
  });
};

//后台安全退出
exports.loginOut = function (req, res, next) {
  req.session.destroy();
  //res.clearCookie(config.auth_cookie_name, { path: '/' });
  res.redirect('/adminLogin');
};


