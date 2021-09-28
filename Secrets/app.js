//jshint esversion:6
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));



const md5 = require('md5');
const bcrypt = require('bcrypt');


mongoose.connect("mongodb://localhost:27017/userDB");

const saltRounds = 10;

userSchema = new  mongoose.Schema({
    email:String,
    password:String
})
//userSchema.plugin(encrypt, { secret: process.env.SECRETS ,encryptedFields: ['password']} )

const User=new mongoose.model("User",userSchema);

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
   const email=req.body.username
   const password=(req.body.password)
   console.log(email,password);

    User.findOne({"email":email},function(err,result)
    {
        if (err)console.log(err)
        else
        {
            if (result)
            {
                bcrypt.compare(password, result.password, function(err, result) {
                   
                    if (result)
                    res.render("secrets");
                });
            }
        }
    })
})


app.route("/register")
.get(function(req,res)
{
    res.render("register");
})
.post(function(req,res){

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                
                const newUser =new User(
                    {
                        email:req.body.username,
                        password:hash
                    }
                )
                newUser.save(function(err)
                {
                 if(err)console.log(err)
                 else
                res.render("secrets");
                 });
    }); 
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });