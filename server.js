/*
Express is used for request handling. Documemntation - >https://expressjs.com/en/4x/api.html#express

path is used for acessing files. Documentation -> https://nodejs.org/api/path.html

*/
var express = require('express');

//var path = require('path');

var app = express();

app.use(express.static('public'));
app.use("/signin", express.static('welcome.html'));
app.use("/chat", express.static('chatui.html'));

app.listen(8000, function() {
    console.log("Server is running on Port: " + 8000);
});

