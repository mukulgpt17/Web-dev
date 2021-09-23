const express=require("express");
const app=express();
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var gen=["Eat","Code","Drink"];
var worklist=[];
app.get("/",function(req,res)
{
  
    res.render('gen', {gern: gen,list_name:"General"});
})

app.get("/work",function(req,res)
{
    console.log("check work route");
    res.render('gen',{gern:worklist,list_name:"Work List"});
})

app.get("/about",function(req,res){
    res.render("aboutUs");

})

app.post("/",function(req,res)
{
   if(req.body.button==="General")
   {
    gen.push(req.body.work);
    res.redirect("/");
   }
   else{
       worklist.push(req.body.work);
       res.redirect("/work");
   }
}

)



app.listen(4000,function()
{
    console.log("Server is running");
}
)