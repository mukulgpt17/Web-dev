//jshint esversion:6
require('dotenv').config();
const md5 = require('md5');
const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');
const bcrypt = require('bcrypt');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

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
   const password=md5(req.body.password)
   console.log(email,password);

    User.findOne({"email":email},function(err,result)
    {
        if (err)console.log(err)
        else
        {
            if (result)
            {
                if (result.password==password)
                {
                    res.render("secrets");
                }
                else{
                    console.log("User does not exists ");
                }
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

    const newUser = new User(
        {
            email:req.body.username,
            password:md5(req.body.password)
        } 
    )

    newUser.save(function(err)
    {
        if(err)console.log(err)
        else
        res.render("secrets");
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });