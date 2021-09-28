
const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

//TODO


mongoose.connect("mongodb://localhost:27017/WikiDB");

const articleSchema={
    title:String  ,
    content:String
};

const artilce=mongoose.model("articles",articleSchema);


app.route("/articles")
.get(function(req,res)
{
    artilce.find(function(err,result)
    {
        if (err)console.log(err);
        else res.send(result);
    })})
.post(
    function(req,res)
        {
    var tits=req.body.title;
    var cont=req.body.content;

    const data=new artilce(
        {
            title:tits,
            content:cont
        }
    )
    }
)



app.route("/articles/:title")
.get(function(req,res)
{
    var title=req.params.title;


    artilce.find({"title":title},function(err,result)
    {
        if(err)
        console.log(err);
        else
        res.send(result);
    })
})
.put(function(req,res)
{
 // use overwrite 
})
.patch(function(req,res)
{

})
.delete(function(req,res)
{
    var title=req.params.title;

    artilce.deleteOne({"title":title},function(err)
    {
        if(err)console.log(err);
        else
        res.send("Deleted");
    })


});













app.listen(3000, function() {
  console.log("Server started on port 3000");
});