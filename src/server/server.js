var express = require('express'),
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

var server = http.createServer(app);
var io = socketIo.listen(server);

server.listen(3002);

app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:3002");

// array of all lines drawn
var line_history = [];
let currentDrawer = null;
var users = [];
let currentWord = "";
let words = ["apple", "pear", "banana"];
let sessionEnd = false;
var index = 0;
let arrayIndex = 0;

// event-handler for new incoming connections
io.on('connection', function (socket) {
    console.log('a user connected');

   // first send the history to the new client
   for (var i in line_history) {
      socket.emit('draw_line', { line: line_history[i] } );
   }
   socket.emit('print_user', users);

   currentWord = words[Math.floor(Math.random() * words.length)];
   arrayIndex = words.indexOf(currentWord);
   words.splice(arrayIndex, 1);

   socket.emit('current_user', { drawer: currentDrawer, word: currentWord});

   //canvas drawing communication
   // add handler for message type "draw_line".
   socket.on('draw_line', function (data) {
      // add received line to history 
      line_history.push(data.line);
      // send line to all clients
      io.emit('draw_line', { line: data.line });
   });


   //print the list of users in game room
   socket.on('print_user', function(data){
       users.push(data.user);
       io.emit('print_user',  users)
       currentDrawer = users[index];
   })


   //print chat
   socket.on('chat', function(data){
       if(data.msg === currentWord){
            console.log('word guessed right');
            // usersGuessed.push(data.user);
            if(index === 0){
                index = 1;
            }else{
                index = 0;
            }
            currentDrawer = users[index];
            currentWord = "banana";
            line_history = [];
            for (var i in line_history) {
                socket.emit('draw_line', { line: line_history[i] } );
             }
             socket.emit('print_user', users);
             io.emit('chat', { user: data.user, msg: "guessed it right"}); 
             io.emit('current_user', { drawer: currentDrawer, word: currentWord});  

            console.log(currentDrawer);
       } else{
            io.emit('chat', data);
       }             
   })
   
   //when client disconnets
   socket.on('disconnect', function(){
    console.log('user disconnected');
    line_history = [];
    users = [];
  });
});
