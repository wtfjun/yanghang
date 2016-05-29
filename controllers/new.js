var New = require('../proxy').New;
var models = require('../models');
var validator = require('validator');
var eventproxy = require('eventproxy');
var authMiddleWare = require('../middlewares/auth');
var multiparty = require('multiparty');
var fs = require('fs');
var util = require('util');
var NewSchema = models.New;

exports.showNews = function(req, res) {
  /*得到所有新闻*/
  NewSchema.find(function(err, docs) {
    if(err) {
      return handleError(err);
    }
    res.render('index/news', {
    title: '新闻',
    leftTitle: '新闻动态',
    leftTitleUs: 'News Center',
    allNews: docs
  });
  });  
}

exports.addNews = function(req, res) {
  var title = req.body.title;
  var desc = req.body.desc;

  New.createANew(title, desc);
  res.render('admin/index', {
    
  });
}


//发布新闻
var fileSrc = 'public/images/newsImg/';//文件上传到该文件夹

exports.releaseNew =  function(req, res, next) {

  //生成multiparty对象
  var form = new multiparty.Form({uploadDir: fileSrc});

  //上传后处理
  form.parse(req, function(err, fields, files) {
    
    var filesTmp = JSON.stringify(files,null,2);

    if(err) {
      console.log('parse err: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
        var inputFile = files.inputFile[0];
        var uploadedPath = inputFile.path;
        var dstPath = fileSrc + inputFile.originalFilename;
        //重命名为真实文件名
        fs.rename(uploadedPath, dstPath, function(err) {
          if(err){
            console.log('rename error: ' + err);
          } else {
            
            
            console.log('rename ok');
          }
        });   
        
        New.createANew(fields.title, fields.desc, inputFile.originalFilename,function(err){
          if(err) {
            return next(err);
          }
          
        });  
    }
    
      res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: filesTmp}));
      return;
  });
}




