const variables = require("../config/key");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');

const User = mongoose.model('user');


passport.serializeUser((user,done)=>{
    console.log("=====SERIALIZO USER=======");
    //envia únicamente el id para que lo consulte en la base de datos cuando lo deserealize
   done(null,user.id);
});


passport.deserializeUser((id,done)=>{
    //lo llama cuando consulta el usuario en un endpoint con req.user
    User.findById(id)
        .then((user)=>{
            done(null,user);
        });
});

require('dotenv').config()
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback',
        scope: 'profile'
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log("=====OBTUVO TOKEN=======");
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        User.findOne({googleId:profile.id})
            .then((existUser)=>{
                console.log("EXIST USER ->>",existUser);
                if(existUser){
                    console.log('Usuario existe');
                    cb(null,existUser);
                }else{
                    new User({googleId:profile.id})
                        .save().then((user)=>{
                            console.log('Usuario no existe');
                        cb(null,user);
                    });
                }
            });
    }
));
