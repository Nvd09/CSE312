const bcrypt = require('bcrypt');
const express = require('express');
const login_validation = require('./login_validation');
const registration_validation = require('./registration_validation');
const User = require('../user.model');

const router = new express.Router();



router.post('/registration', async (req, res) => {
  const { errors, isValid } = registration_validation(req.body);
  console.log(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.find({ email: req.body.email }).exec();
    if (user.length > 0) {
      return res.status(409).json({ error: 'You have already registered with this email.' });
    }
    return bcrypt.hash(req.body.password, 12, (error, hash) => {
      if (error) {
        return res.status(500).json({ error });
      }
      const new_User = new User({
        registration_date: new Date().getTime(),
        email: req.body.email,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name
       
      });
      return new_User
        .save()
        .then(() => {
          res.status(201).send("Congrats!!! You have successfully registered to the social media site. Go back and log in with your credenctials");
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
});
router.post('/login', async (req, res) => {
  const { errors, isValid } = login_validation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(401).json({
        email: 'The email does not exist'
      });
    }

    return bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Login Failed'
        });
      }
      if(!result){
        res.send("Your Password is incorrect! Go back to root path and log back in");
      }

      if (result) {
        
    req.session.account = user._id;
    res.redirect('/profile');
      
}
   


       });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
