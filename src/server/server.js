var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('mouse', mouseMsg);
    socket.on('submit', chatMsg);

    function mouseMsg(data){
        socket.broadcast.emit('mouse', data);
        console.log(data)
    }

    function chatMsg(data){
        socket.broadcast.emit('submit', data);
        console.log(data)
    }

})

http.listen(3002, function(){
    console.log('listening on 3002');
})