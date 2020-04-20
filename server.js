/*
Express is used for request handling. Documemntation - >https://expressjs.com/en/4x/api.html#express

path is used for acessing files. Documentation -> https://nodejs.org/api/path.html

*/
var express = require('express');

const multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');
var file_system = require('fs');
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
const db = require("./config/database").mongoURI;
var Image = require('./user.model');
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



app.post('/upload-image', upload.single('profile-picture'), (req, res) => {
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
            res.status(200).send('image is saved on the disk inside uploads folder, image details added successfully to the databasea nd please go to the path "{localhosthost:8000/retrieve-image"to see the submitted image');
        })
        .catch(err => {
            res.status(400).send('saving image details in database failed');
        });

   
     
  })

app.use("/profile", express.static('user_profile.html'));

app.use("/profile", express.static('user_profile.html'));


app.use("/profile", express.static('user_profile.html'));

app.use("/signin", express.static('welcome.html'));
app.use("/chat", express.static('chatui.html'));
app.use("/homepage.html", express.static('homepage.html'));
app.use("/chatui.html", express.static('chatui.html'));
app.use("/user_profile.html", express.static('user_profile.html'));

app.get('/retrieve-image', (req, res) => {
 Image.find(function(err, images) {
        if (err) {
            console.log(err);
        } else {
            res.json(images);
        }
    });
 

});


app.listen(8000, function() {
    console.log("Server is running on Port: " + 8000);
});

