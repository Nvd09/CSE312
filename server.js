/*
Express is used for request handling. Documemntation - >https://expressjs.com/en/4x/api.html#express

path is used for acessing files. Documentation -> https://nodejs.org/api/path.html

*/
const express = require('express');
const authRoutes = require('./routes/auth-routes');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home');
});


// app.use("/profile", static('user_profile.html'));
// app.use("/signin", static('welcome.html'));
// app.use("/chat", static('chatui.html'));
// app.use("/homepage.html", static('homepage.html'));
// app.use("/chatui.html", static('chatui.html'));
// app.use("/user_profile.html", static('user_profile.html'));

app.listen(3000, function() {
    console.log("Server is running on Port: " + 3000);
});

