var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt-nodejs') ,
    SALT_WORK_FACTOR = 10,
    TITLE_REG = '注册';



router.get('/', function(req, res) {
  res.render('reg',{title:TITLE_REG});
});

router.post('/', function(req, res) {
  var userName = req.body['txtUserName'],
      userPwd = req.body['txtUserPwd'],
      userRePwd = req.body['txtUserRePwd'],
      saltUserPwd = '',      
      md5 = crypto.createHash('md5');
 
  var oldUserPwd = md5.update(userPwd).digest('hex');
  /*
   * 数据库中保存hash密码 以及对应的加密salt
   * 10位盐
   */
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt){ 
      // if (err) {
      //     return next(err)
      // }
      console.log('salt:'+ salt)
      bcrypt.hash(oldUserPwd,salt ,null,function(err,hash){
        // if(err) return next(err)
          console.log('hash:'+hash)
          saltUserPwd = hash;
          storeUInfo();
      })
  })

  function storeUInfo(){
    console.log('userName：'+userName+'\n'+'saltUserPwd：'+saltUserPwd);
    var newUser = new User({
        username: userName,
        userpass: saltUserPwd
    });

    //检查用户名是否已经存在
    User.getUserNumByName(newUser.username, function (err, results) {        
               
        if (results != null && results[0]['num'] > 0) {
            err = '用户名已存在';
        }

        if (err) {
            res.locals.error = err;
            res.render('reg', { title: TITLE_REG });
            return;
        }

        newUser.save(function (err,result) {
            if (err) {
                res.locals.error = err;
                res.render('reg', { title: TITLE_REG }); 
                return;            
            }        

            if(result.insertId > 0)
            {
                res.locals.success = '注册成功,请点击   <a class="btn btn-link" href="/login" role="button"> 登录 </a>' ;
            }
            else
            {
                res.locals.error = err;
            }
           
            res.render('reg', { title: TITLE_REG });
            });    
      });
  }
});

module.exports = router;