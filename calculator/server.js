const express=require("express");
const app =express();
const bodyParser=require("body-parser");

app.use(express.urlencoded({extended:true}));
 
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res)
{
    console.log(req.body);
    var ans=Number(req.body.First)+Number(req.body.Second);
    res.send("Data received "+ ans);
})

app.listen(3000,function()
{
    console.log("server started on 3000 port");
}

)