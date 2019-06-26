const http = require('http');

const fs = require('fs');

const app = http.createServer(function (req, res) {
    // console.log(__dirname);
    fs.readFile(__dirname + '\\app.html', function (err, data) {
        res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});
        res.end(data);
    });
});

app.listen(3000, function () {
    console.log('服务已启动');
});

const io = require('socket.io')(app);

io.on('connection', function (socket) {
    console.log('服务器建立连接了');

    // 服务器获取客户端数据
    socket.on('addCart', function (data) {
        console.log(data);
        // 服务器主动给客户端发送数据
        // 谁给我发的，我发给谁
        socket.emit('to-client', '我是服务器数据');
        // 广播，群发
        io.emit('allNews', '群发数据');
    });
});

/*
* 1
* npm install socket.io --save
* */

/*
* 2 引入建立连接
* const io = require('socket.io')(app);

io.on('connection', function (socket) {
    console.log('服务器建立连接了');
});
* */
