
const express=require("express");
const app=express();
const http=require("https");
const bodyParser=require("body-parser");
const { Http2ServerRequest } = require("http2"); 
app.use(express.urlencoded({extended:true}));
 

app.get("/",function(req,resp)
{
    // console.log(res);
    // res.send("Hello world ");
    resp.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,resp)
{
    var city=req.body.cityName;
    var key="3a9615e1a2c44c731a41445605a60785";
    var url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units=metric";

    http.get(url,(res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                // do something with JSON
                resp.write("<h1>CURRENT TEMP IS " +json.main.temp+" degree celcuis</h1>")
                resp.write("<h1>current weather in "+ city+ " is " +json.weather[0].description+ "</h1>")
                var iconurl =  "http://openweathermap.org/img/wn/"+json.weather[0].icon+"@2x.png";
                resp.write("<img src='"+iconurl+"' alt='Weather condition' width='150' height='160'>");
                console.log("current weather in "+city+" is "+json.weather[0].description );
                resp.send();

            } catch (error) {
                console.error(error.message);
                resp.send("<h1>Invalid City</h1>");

            };
        });

    }).on("error", (error) => {
        console.error(error.message);
        resp.send("<h1>Invalid City</h1>");
    });


})












app.listen(3000,function()
{
    console.log("Server is ruuning");
}
)


