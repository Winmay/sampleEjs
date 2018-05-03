"# sampleEjs" 


## 安装步骤 ##

	git clone git@github.com:Winmay/sampleEjs.git      // 把模板下载到本地
	cd sampleEjs	    // 进入模板目录
	npm install         // 安装项目依赖，等待安装完成之后

## 运行程序 ##

	// 开启服务器，浏览器访问 http://localhost:8000
	node app


## 创建数据库 ##

请参考 [Nodejs学习笔记（四）--- 与MySQL交互（felixge/node-mysql）](http://www.cnblogs.com/zhongweiv/p/nodejs_mysql.html#!comments)

## 问题解决 ##

由于数据库还没开启，运行程序后出错：

```
E:\project\sampleEjs\models\user.js:29
    connection.query(useDbSql, function (err) {
               ^

TypeError: Cannot read property 'query' of undefined
    at E:\project\sampleEjs\models\user.js:29:16
    at Handshake.onConnect [as _callback] (E:\project\sampleEjs\node_modules\mysql\lib\Pool.js:58:9)
    at Handshake.Sequence.end (E:\project\sampleEjs\node_modules\mysql\lib\protocol\sequences\Sequence.js:88:24)
    at Protocol.handleNetworkError (E:\project\sampleEjs\node_modules\mysql\lib\protocol\Protocol.js:363:14)
    at PoolConnection.Connection._handleNetworkError (E:\project\sampleEjs\node_modules\mysql\lib\Connection.js:428:18)
    at emitOne (events.js:116:13)
    at Socket.emit (events.js:211:7)
    at emitErrorNT (internal/streams/destroy.js:64:8)
    at _combinedTickCallback (internal/process/next_tick.js:138:11)
    at process._tickCallback (internal/process/next_tick.js:180:9)
```

1、解决mysql不是内部或外部命令

访问地址：[点击这里](https://jingyan.baidu.com/article/f7ff0bfc169a2a2e27bb1365.html)

2、解决Can't connect to MySQL server on  "localhost" (10061)

访问地址：
[mysql-5.7.21-winx64.zip安装教程](https://blog.csdn.net/we_are_the_world_123/article/details/79230537)

[解决Can't connect to MySQL server on XXX](https://jingyan.baidu.com/article/636f38bb6af8ded6b946104f.html)

3、net start mysql发生系统错误

```
$ net start mysql
发生系统错误 2。

系统找不到指定的文件。
```

访问地址：[点击这里](https://blog.csdn.net/mhmyqn/article/details/17043921)


4、解决Access denied for user 'root'@'localhost' (using password:YES)

访问地址：[点击这里](https://www.cnblogs.com/da19951208/p/6403783.html?utm_source=itdadao&utm_medium=referral)