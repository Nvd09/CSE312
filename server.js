/*
Express is used for request handling. Documemntation - >https://expressjs.com/en/4x/api.html#express

path is used for acessing files. Documentation -> https://nodejs.org/api/path.html

*/
var express = require('express');
var cookieParser = require('cookie-parser')
var session = require('express-session');
const multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');
var file_system = require('fs');
var user= require('./routes/authRoute');
var parser = require('body-parser');
var socket = require('socket.io');

var storage = multer.diskStorage({


  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
 
    cb(null, 'image'+ '-' + Date.now() )
  }
})


 
var upload = multer({ storage: storage })
var app = express();
app.set('view engine', 'ejs'); 

const db = require("./config/database").mongoURI;
var Image = require('./image.model');
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
     useUnifiedTopology: true 
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

var server = app.listen(8000, function() {
    console.log("Server is running on Port: " + 8000);
});
app.use(cookieParser());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(session({
    key: 'bd',
    secret: 'bangladesh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 500000
    }
}));
app.use('/user', user);
app.use(express.static('public'));
var session_verification = (req, res, next) => {
    if (req.session.account && req.cookies.bd) {
        res.redirect('/profile');
    } else {
        next();
    }    
};
app.get("/", session_verification, function (req, res) {
  
  res.sendFile(__dirname + "/welcome.html");

})



app.post('/upload-image', session_verification, upload.single('profile-picture'), (req, res) => {
  console.log(req.file.path);
 var profilepic = file_system.readFileSync(req.file.path);
 
 var convert = profilepic.toString('base64');
 
   var savedProfilePic = {
      contentType: req.file.mimetype,
      image:  new Buffer(convert, 'base64')
};
 console.log("image is saved in disk")
 var image = new Image({image_name: req.file.path, image_created: Date.now()
    });
    image.save()
        .then(image => {
            res.status(200).send('image is saved on the disk inside uploads folder, image details added successfully to the database and please go to the path "{localhosthost:8000/retrieve-image"to see the submitted image');
        })
        .catch(err => {
            res.status(400).send('saving image details in database failed');
        });

   
     
  });



app.get("/homepage.html", function (req, res) {
  if (req.session.account && req.cookies.bd) {

        res.sendFile(__dirname + "/homepage.html");
    }
    else
       res.send("You aren't logged in");
});

app.get("/chatui.html", function (req, res) {
  if (req.session.account && req.cookies.bd) {
        res.sendFile(__dirname + "/chatui.html");
    }
    else
       res.send("You aren't logged in");
});
app.get('/signout', (req, res) => {
    if (req.session.account && req.cookies.bd) {
        res.clearCookie('bd');
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});


app.get("/profile",  (req, res) => {
    if (req.session.account && req.cookies.bd) {
        console.log(req.session.account);
        res.render("profile", { name : req.session.account});
    }
    else
       res.send("You aren't logged in");

});
app.get("/user_profile.html",  (req, res) => {
    if (req.session.account && req.cookies.bd) {
        res.sendFile(__dirname + "/user_profile.html");
    }
    else
       res.send("You aren't logged in");

});

app.use("/voting.js", express.static('voting.js'));
app.use("/IMG_20180922_192802.jpeg", express.static('IMG_20180922_192802.jpeg'));


app.get('/retrieve-image',(req, res) => {
 Image.find(function(err, images) {
        if (err) {
            console.log(err);
        } else {
            res.json(images);
        }
    });
 

});




//Socket Setup



var io= socket(server);

io.on('connection', function(socket){
  console.log('Socket Conneection has been made');
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

});


