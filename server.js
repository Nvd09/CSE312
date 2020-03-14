/*
Express is used for request handling. Documemntation - >https://expressjs.com/en/4x/api.html#express

path is used for acessing files. Documentation -> https://nodejs.org/api/path.html

*/
var express = require('express');



var app = express();

app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/welcome.html");
})
app.use("/profile", express.static('user_profile.html'));
app.use("/signin", express.static('welcome.html'));
app.use("/chat", express.static('chatui.html'));
app.use("/homepage.html", express.static('homepage.html'));
app.use("/chatui.html", express.static('chatui.html'));
app.use("/user_profile.html", express.static('user_profile.html'));

app.listen(8000, function() {
    console.log("Server is running on Port: " + 8000);
});

