var express = require('express'),
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

var server = http.createServer(app);
var io = socketIo.listen(server);

server.listen(3002);

app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:3002");

var line_history = [];// array of all lines drawn
let currentDrawer = null;// will store the current drawing user
var users = [];//all user in the room
var usersGuessed = [];//array of user who guessed a particular word
let userTimeout = [];//array of user who passed time.
let seconds = 20;
let words = ["apple", "pear", "banana"];
let round = 1;
let sessionEnd = true;
var index = 0;
var gameover = false;
let wordGuessed = {}; //{ currentWord: userGuessed }
let userScore = {}; //{ username: score }


//set first currentWord
let currentWord = words[Math.floor(Math.random() * words.length)];
let arrayIndex = words.indexOf(currentWord);
words.splice(arrayIndex, 1);
console.log(words);

// event-handler for new incoming connections
io.on('connection', function (socket) {
    // console.log('a user connected');
   // first send the history to the new client
   for (var i in line_history) {
      socket.emit('draw_line', { line: line_history[i] } );
   }
   socket.emit('print_user', users);
   socket.emit('current_user', { drawer: currentDrawer, word: currentWord, game_status: gameover, sessionEnd: sessionEnd, round: round, guessed: wordGuessed, scores:userScore});

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
       console.log(users.length, " users");
   })

   socket.on('start', function(data){
        let timer = setInterval(() => {
            if (seconds >= 1) { 
                seconds = seconds - 1;
                io.emit('time_left', { seconds: seconds })
            } else if(seconds === 0){ 
                clearInterval(timer);
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
                if(words.length>0 ){
                    currentWord = words[Math.floor(Math.random() * words.length)];
                    arrayIndex = words.indexOf(currentWord);
                    words.splice(arrayIndex, 1);
                    seconds = 20;
                    console.log(words);
                }else{
                    gameover = true;
                    users = [];
                    line_history = [];
                    round = 0;
                    usersGuessed = [];
                    index = 0;
                    words = ["apple", "pear", "banana"];
                }

                io.emit('time_left', { seconds: seconds });
                io.emit('chat', { user: data.user, msg: "time is up"}); 
                io.emit('current_user', { drawer: currentDrawer, word: currentWord, game_status: gameover, sessionEnd: sessionEnd, round: round, guessed: wordGuessed, scores:userScore});  
            }
        }, 1000);
   })

   //print chat
   socket.on('chat', function(data){
       if(data.msg === currentWord){
            usersGuessed.push(data.user);
            wordGuessed[currentWord] = usersGuessed;

            if(userScore[data.user.username]){
                userScore[data.user.username] += 10;
            }else{
                userScore[data.user.username] = 0;
                userScore[data.user.username] += 10;
            }

            if(userScore[currentDrawer.username]){
                userScore[currentDrawer.username] += Math.abs(10/(users.length-1));
            }else{
                userScore[currentDrawer.username] = 0;
                userScore[currentDrawer.username] += Math.abs(10/(users.length-1));
            }
    
            console.log(userScore);
            if(usersGuessed.length + 1 === users.length || userTimeout.length === users.length){
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
                if(words.length>0 ){
                    currentWord = words[Math.floor(Math.random() * words.length)];
                    arrayIndex = words.indexOf(currentWord);
                    words.splice(arrayIndex, 1);
                    seconds = 20;
                    console.log(words);
                }else{
                    gameover = true;
                    users = [];
                    line_history = [];
                    round = 0;
                    usersGuessed = [];
                    index = 0;
                    words = ["apple", "pear", "banana"];
                }
                
            }else{
                sessionEnd = false;
            }

             socket.emit('print_user', users);
             io.emit('chat', { user: data.user, msg: "guessed it right"}); 
             io.emit('current_user', { drawer: currentDrawer, word: currentWord, game_status: gameover, sessionEnd: sessionEnd, round: round, guessed: wordGuessed, scores: userScore});  

            // console.log(currentDrawer);
       } else{
            io.emit('chat', data);
       }             
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
