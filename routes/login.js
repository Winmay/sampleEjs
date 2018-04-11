var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt-nodejs') ,
    TITLE_LOGIN = '登录';

router.get('/', function(req, res) {
    res.render('login',{title:TITLE_LOGIN});
});

router.post('/', function(req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        isRem = req.body['chbRem'],
        md5 = crypto.createHash('md5');
       
    User.getUserByUserName(userName, function (err, results) {                            
        
        if(results == '')
        {
            res.locals.error = '用户不存在';
             res.render('login',{title:TITLE_LOGIN});
             return;
        }

        userPwd = md5.update(userPwd).digest('hex');
        //检查数据库里的加盐密码和用户输入的密码是否匹配,user.password为数据库里存储的密码
        bcrypt.compare(userPwd, results[0].userPass,function(err,res){
           var pwdMatchFlag = res;
           tryLogin(pwdMatchFlag);
           console.log(pwdMatchFlag);
        })
        // 尝试登录
        function tryLogin(pwdMatchFlag){
            if(pwdMatchFlag){
                if(isRem)
                {
                    res.cookie('islogin', userName, { maxAge: 60000 });                 
                }

                res.locals.username = userName;
                req.session.username = res.locals.username;  
                console.log(req.session.username);                        
                res.redirect('/');
                return;   //匹配成功跳转到主页
            }else{
                res.locals.error = '用户名或密码有误';
                res.render('login',{title:TITLE_LOGIN});
                console.log(1);
                return;  //匹配失败返回之前的页面
            }
        }
         // console.log(results);
         // console.log('userName:'+userName+'\n'+'userPwd:'+userPwd);
         /*
         if(results[0].userName != userName || results[0].userPass != userPwd)
         {
             res.locals.error = '用户名或密码有误';
             res.render('login',{title:TITLE_LOGIN});
             console.log(1);
             return;
         }
         else
         {
             if(isRem)
             {
                res.cookie('islogin', userName, { maxAge: 60000 });                 
             }

             res.locals.username = userName;
             req.session.username = res.locals.username;  
             console.log(req.session.username);                        
             res.redirect('/');
             return;
         } 
         */    
    });              
});

module.exports = router;
