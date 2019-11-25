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
var usersGuessed = [];
let words = ["apple", "pear", "banana"];
let round = 1;
let sessionEnd = true;
var index = 0;
let arrayIndex = 0;
var gameover = false;


let currentWord = words[Math.floor(Math.random() * words.length)];
arrayIndex = words.indexOf(currentWord);
words.splice(arrayIndex, 1);
console.log(words);

// event-handler for new incoming connections
io.on('connection', function (socket) {
    console.log('a user connected');

   // first send the history to the new client
   for (var i in line_history) {
      socket.emit('draw_line', { line: line_history[i] } );
   }
   socket.emit('print_user', users);
   socket.emit('current_user', { drawer: currentDrawer, word: currentWord, round:round, sessionEnd: sessionEnd});

   currentDrawer = users[index];

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
       io.emit('print_user',  users);
   })


   //print chat
   socket.on('chat', function(data){
       if(data.msg === currentWord){
            console.log(sessionEnd);
            usersGuessed.push(data.user);

            if(usersGuessed.length + 1 === users.length){
                sessionEnd = true;
                usersGuessed = [];
                round += 1;

                //reset currentUser
                if(index < users.length - 1 ){
                    index += 1;
                }else{
                    index = 0;
                }
                currentDrawer = users[index];

                //clear canvas
                line_history = [];

                //reset currentWord
                if(words.length>0){
                    currentWord = words[Math.floor(Math.random() * words.length)];
                    arrayIndex = words.indexOf(currentWord);
                    words.splice(arrayIndex, 1);
                    console.log(words);
                }else{
                    gameover = true;
                    users = [];
                    line_history = [];
                    round = 1;
                    usersGuessed = [];
                    index = 0;
                    words = ["apple", "pear", "banana"];
                }
                
            }else{
                sessionEnd = false;
            }

             socket.emit('print_user', users);
             io.emit('chat', { user: data.user, msg: "guessed it right"}); 
             io.emit('current_user', { drawer: currentDrawer, word: currentWord, game_status: gameover, sessionEnd: sessionEnd, round: round});  

            // console.log(currentDrawer);
       } else{
            io.emit('chat', data);
       }             
   })

   socket.on('session_status', function(data){
       sessionEnd = data.sessionEnd;
       console.log('now session status is ', sessionEnd);
   })
   
   //when client disconnets
   socket.on('disconnect', function(){
    console.log('user disconnected');
    users = [];
    line_history = [];
    round = 1;
    usersGuessed = [];
    index = 0;
    words = ["apple", "pear", "banana"];
  });
});
