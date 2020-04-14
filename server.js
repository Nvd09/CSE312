/*
Express is used for request handling. Documemntation - >https://expressjs.com/en/4x/api.html#express

path is used for acessing files. Documentation -> https://nodejs.org/api/path.html

*/
var express = require('express');

var path = require('path');
var mongoose = require('mongoose');
var app = express();
const db = require("./config/database").mongoURI;
var User = require('./user.model');
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
     useUnifiedTopology: true 
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/welcome.html");
})

app.use("/signin", express.static('welcome.html'));
app.use("/chat", express.static('chatui.html'));

app.listen(8000, function() {
    console.log("Server is running on Port: " + 8000);
});

