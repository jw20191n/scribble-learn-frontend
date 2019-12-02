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
let seconds = 30;//set time
let words = ["apple", "pear", "banana"];
let round = 1;
var index = 0;
let sessionEnd = true;
var gameover = false;
let wordGuessed = {}; //{ currentWord: userGuessed }
let userScore = {}; //{ username: score }
let popup = true;
let addScore = {};//{ username: score } not cumulative

//set first currentWord
let currentWord = words[Math.floor(Math.random() * words.length)];
let arrayIndex = words.indexOf(currentWord);
words.splice(arrayIndex, 1);
console.log(words);

// event-handler for new incoming connections
io.on('connection', function (socket) {

   // first send the history to the new client
   for (var i in line_history) {
      socket.emit('draw_line', { line: line_history[i] } );
   }
   socket.emit('print_user', users);
   socket.emit('current_user', { drawer: currentDrawer, word: currentWord, game_status: gameover, sessionEnd: sessionEnd, round: round, guessed: wordGuessed, scores:userScore, popup: popup, addScore: addScore});

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
       userScore[data.user.username] = 0;
       addScore[data.user.username] = 0;
       io.emit('print_user',  users);
       console.log(users.length, " users");
   })


   //when user join Game component, they send currentUser and "start:true" to server
   //trigger the timer
   socket.on('start', function(data){

        let user = data.user;
        
        let timer = setInterval(setTimer, 1000);

        function setTimer(user){
            if (seconds >= 1) { 
                seconds = seconds - 1;
                //send time_left to Timer.js to print out the time
                io.emit('time_left', { seconds: seconds })
            } else if(seconds === 0 ){ 
                clearInterval(timer);
        
                sessionEnd = true;
                usersGuessed = [];
                //clear canvas
                line_history = [];
                popup = true;
        
                //reset currentWord, if word array has word left, continue game
                if(words.length>0 ){
                    currentWord = words[Math.floor(Math.random() * words.length)];
                    arrayIndex = words.indexOf(currentWord);
                    words.splice(arrayIndex, 1);
        
                    seconds = 30;
                    round += 1;
        
                    //reset currentUser
                    if(index < users.length - 1 ){
                        index += 1;
                    }else{
                        index = 0;
                    }
                    currentDrawer = users[index];
                    console.log('session end due to time out. words left: ', words);
                    io.emit('chat', { user: user, msg: "time is up"}); 
                }else{
                    gameover = true;
                    round = 1;
                    index = 0;
                    users = [];
                    // words = ["apple", "pear", "banana"];
                    // currentWord = words[Math.floor(Math.random() * words.length)];
                    // arrayIndex = words.indexOf(currentWord);
                    // words.splice(arrayIndex, 1);
                    console.log('start game over', 'words --->', words, 'currentWord --->', currentWord, 'currentDrawer --->', currentDrawer, 'users--->', users, 'round: ', round);
                }
                io.emit('time_left', { seconds: seconds });
                io.emit('current_user', { drawer: currentDrawer, word: currentWord, game_status: gameover, sessionEnd: sessionEnd, round: round, guessed: wordGuessed, scores:userScore, popup: popup, addScore: addScore});  
            }
        }
        
   })

   

   //print chat
   socket.on('chat', function(data){
       if(data.msg === currentWord){
            usersGuessed.push(data.user);
            wordGuessed[currentWord] = usersGuessed;

            //user who guess right got 10 points
            userScore[data.user.username] += 10;

            //if two players, drawer got 10; if multiple, drawer got 1/n-1
            userScore[currentDrawer.username] += Math.abs(10/(users.length-1));
          

            console.log('userScore ----> ', userScore);

            //if all the users guessed right, session ends
            if(usersGuessed.length + 1 === users.length){
                sessionEnd = true;
                usersGuessed = [];

                //reset currentUser
                if(index < users.length - 1 ){
                    index += 1;
                }else{
                    index = 0;
                }
                currentDrawer = users[index];

                //clear canvas
                line_history = [];
                popup = true;

                //reset currentWord
                if(words.length>0 ){
                    currentWord = words[Math.floor(Math.random() * words.length)];
                    arrayIndex = words.indexOf(currentWord);
                    words.splice(arrayIndex, 1);
                    seconds = 30;
                    round += 1;
                    console.log('session end all users guessed right. words left: ', words);
                }else{
                    // gameover = true;
                    // round = 1;
                    // index = 0;
                    seconds = 0;
                    // currentDrawer = users[index];
                    // users = [];
                    // words = ["apple", "pear", "banana"];
                    // currentWord = words[Math.floor(Math.random() * words.length)];
                    // arrayIndex = words.indexOf(currentWord);
                    // words.splice(arrayIndex, 1);
                    // console.log('chat game over', 'words --->', words, 'currentWord --->', currentWord, 'currentDrawer --->', currentDrawer, 'users--->', users, 'round: ', round);

                }
            //still has user not guessing right
            }else{
                sessionEnd = false;
                popup = false;
            }

             io.emit('chat', { user: data.user, msg: "guessed it right"}); 
             io.emit('current_user', { drawer: currentDrawer, word: currentWord, game_status: gameover, sessionEnd: sessionEnd, round: round, guessed: wordGuessed, scores: userScore, popup: popup, addScore: addScore});  

        //users sent in wrong answer, session continues
       } else{
            io.emit('chat', data);
       }             
   })
   
   //when client disconnets
   socket.on('disconnect', function(){
    console.log('user disconnected');
    // users = [];
    // line_history = [];
    // round = 1;
    // usersGuessed = [];
    // index = 0;
    // words = ["apple", "pear", "banana"];
    // currentDrawer = null;
    // seconds = 30;
    // sessionEnd = true;
    // gameover = false;
    // wordGuessed = {};
    // userScore = {};
    // popup = true;
  });
});
