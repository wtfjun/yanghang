var express = require('express');
var user = require('./controllers/user');
var sign = require('./controllers/sign');
var news = require('./controllers/new');
var admin = require('./controllers/admin');
var client = require('./controllers/client');

var router = express.Router();

router.get('/', sign.showIndex);//进入主页
router.get('/news', news.showNews);//进入新闻总页
router.get('/lianmeng', client.showLianmen);//进入联盟平台详情页






//后台
router.get('/adminLogin', admin.showLogin);//后台登陆界面
router.get('/admin', admin.showIndex);//后台主界面
router.get('/addNews', admin.showAddNews);//后台添加新闻
router.post('/adminLogin', admin.login);//后台登陆检测
router.get('/loginOut', admin.loginOut);//安全退出动作

router.get('/signup', sign.showSignup);//进入注册页面
router.post('/signup', sign.signup);//注册检测

router.get('/addNews', admin.showAddNews);//上传新闻界面
router.post('/addNews', admin.addNewsAction);//上传新闻
router.get('/showReNews', admin.showReNews);//编辑新闻见面
router.post('/reNewsAction', admin.reNewsAction);//编辑新闻动作
router.get('/delNewsAction', admin.delNewsAction);//根据_id删除新闻
router.get('/new', function(req, res){
	res.render('upload', {
		title: '新闻'
	});
});

module.exports = router;