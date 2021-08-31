const { response } = require("express");
const express=require("express");
const app =express();

app.get("/",function (request,response)
{
    // console.log(request);
    response.send("<h1> Hello </h1>")
})

app.get("/contact",function (req,res)
{
    res.send("my contact page");
} 
)
app.listen(4444,function()
{
    console.log("Server started on 4444 port");
}
);

