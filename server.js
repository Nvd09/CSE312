/*
Express is used for request handling. Documemntation - >https://expressjs.com/en/4x/api.html#express

path is used for acessing files. Documentation -> https://nodejs.org/api/path.html

*/
var express = require('express');
var socket = require('socket.io');


var app = express();
var server = app.listen(7004, function() {
    console.log("Server is running on Port: " + 7004);
});



app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/welcome.html");
});
app.post("/homepage.html", function (req, res) {
  res.sendFile(__dirname + "/homepage.html");
});
app.use("/profile", express.static('user_profile.html'));
app.use("/signin", express.static('welcome.html'));
app.use("/chat", express.static('chatui.html'));
app.use("/homepage.html", express.static('homepage.html'));
app.use("/chatui.html", express.static('chatui.html'));
app.use("/user_profile.html", express.static('user_profile.html'));
app.use("/voting.js", express.static('voting.js'));
app.use("/IMG_20180922_192802.jpeg", express.static('IMG_20180922_192802.jpeg'));


//Socket Setup



var io= socket(server);

io.on('connection', function(socket){
  console.log('Socket Conneection has been made');
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });
});


