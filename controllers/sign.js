var User  = require('../proxy').User;
var validator = require('validator');
var eventproxy = require('eventproxy');
var authMiddleWare = require('../middlewares/auth');

//index
exports.showIndex = function(req, res) {
	res.render('index/index', {
		title: '主页'
	});
}

//signup
exports.showSignup = function(req, res) {
	res.render('sign/signup', {
		title: '用户注册'
	});
}
exports.signup = function (req, res, next) {
  var userid = validator.trim(req.body.userid).toLowerCase();
  var password = validator.trim(req.body.password);
  var rePass    = validator.trim(req.body.re_pass);

  var ep = new eventproxy();
  ep.fail(next);
  ep.on('prop_err', function (msg) {
    res.status(422);
    res.render('sign/signup', {title:'用户注册', error: msg});
  });

  // 验证信息的正确性
  /*if ([loginname, pass, rePass, email].some(function (item) { return item === ''; })) {
    ep.emit('prop_err', '信息不完整。');
    return;
  }*/
  /*if (!validator.isEmail(email)) {
    return ep.emit('prop_err', '邮箱不合法。');
  }*/
  if (userid.length < 5) {
    ep.emit('prop_err', '用户名至少需要5个字符。');
    return;
  }
  if (password.length < 6) {
    ep.emit('prop_err', '密码至少需要6个字符。');
    return;
  }
  
  
  if (password !== rePass) {
    return ep.emit('prop_err', '两次密码输入不一致。');
  }

  /*else {
    return ep.emit('prop_err', '错误！请重新输入。');
  }*/
  // END 验证信息的正确性


  User.getUserByUserid(userid, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      ep.emit('prop_err', '用户名已被使用。');
      return;
    }

    User.newAndSave(userid, password ,function(err) {
      if(err) {
        return next(err);
      }
      res.send("注册成功");
    })

  });
};

//signin
exports.showSignin = function (req, res) {
  res.render('sign/signin', {
  	title: '用户登陆'
  });
};

exports.login = function (req, res, next) {
  var userid = validator.trim(req.body.userid).toLowerCase();
  var password = validator.trim(req.body.password);
  var ep = new eventproxy();

  ep.fail(next);

  if (!userid || !password) {
    res.status(422);
    return res.render('sign/signin', { title: '用户登陆', error: '信息不完整。' });
  }

  var getUser = User.getUserByUserid;

  ep.on('login_error', function (login_error) {   //绑定一个login_error事件
    res.status(403);
    res.render('sign/signin', { title: '用户登陆', error: '用户名或密码错误' });
  });
 
  getUser(userid,function(err, user) {
    if(user) {   
      // store session cookie
      authMiddleWare.gen_session(user, res);

      res.send("登陆成功");
    }
    else {
      res.render('sign/signin', {
        title: '用户登陆',
        error: '账号或密码错误'
      });
    }
  });
};

