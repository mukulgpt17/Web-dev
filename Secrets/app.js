//jshint esversion:6
require('dotenv').config();

const express = require("express");
const ejs = require("ejs");
const session = require('express-session'); 

const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const findOrCreate = require('mongoose-findorcreate')


const passport = require('passport');
const passportLocalMongoose=require("passport-local-mongoose");
const { Passport } = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


const app = express();

// SETTING UP THE VIEWS 

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


app.use(session(
    {
        secret:"demo check",
        resave:false,
        saveUninitialized:false
    }
));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB");
userSchema = new  mongoose.Schema({
    email:String,
    password:String,
    googleId:String,
    facebookId:String
})


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User=new mongoose.model("User",userSchema);


passport.use(User.createStrategy());

passport.serializeUser(function(user, done) 
{
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets",
    profileFields: ['id', 'displayName','email']
  }, function(accessToken, refreshToken, profile, cb) 
    {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
    }    
));


app.get("/",function(req,res)
{
    res.render("home");
})



app.route("/login")
.get(function(req,res)
{
    res.render("login");
})
.post(function(req,res)
{
    const user=new User(
        {
            username:req.body.username,
            password:req.body.password
        }
    );

    req.login(user,function(err)
        {
            if(err)
            console.log(err);
            else
            {
                passport.authenticate("local")(req,res,function()
                {
                    res.redirect("/secrets");
                })
            }
        }
    )
    


})


app.get("/logout",function(req,res)
{
    req.logout();
   res.redirect("/"); 
})


app.route("/secrets")
.get(function(req,res)
{
    if(req.isAuthenticated())
    {
        res.render("secrets");
    }
    else
        res.redirect("/login"); 
})



app.route("/register")
.get(function(req,res)
{
    res.render("register");
})
.post(function(req,res){

    User.register({username:req.body.username},req.body.password,function(err,user)
    {
        if (err)
        {
            console.log(err);
            res.redirect("/register");
        }
        else
        {
            passport.authenticate("local")(req,res,function()
            {
                res.redirect("/secrets");
            });
        }
    })
   
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });

app.get('/auth/google/secrets', 
passport.authenticate('google', { failureRedirect: '/' }),
function(req, res) {
// Successful authentication, redirect home.
res.redirect('/secrets');
});

app.get('/auth/facebook',
passport.authenticate('facebook', { scope: ['user_friends'] }));

app.get('/auth/facebook/secrets', 
passport.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
// Successful authentication, redirect home.
res.redirect('/secrets');
});
