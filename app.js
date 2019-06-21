const keys = require("./config/key");
const express = require('express');
require('dotenv').config();
const cookieSession = require('cookie-session');


/*open mongo db*/
const mongoose = require('mongoose');
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
require('./models/User');
require('./services/passportConfig');
const passport = require("passport");


const app = express();

app.use(cookieSession({
    maxAge: 30*24*60*60*100,
    keys:[keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);





