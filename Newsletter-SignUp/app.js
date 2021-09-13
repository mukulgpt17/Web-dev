const express=require("express");
app=express();
const alert=require("alert");
const bodyParser=require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const { json } = require("express");
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/SignUp"));



client.setConfig({
    apiKey: "7bc8f31a45e523264ebfc86f8d7d093c-us5",
    server: "us5",
  });


app.get("/",function(req,resp){
    resp.sendFile(__dirname+"/SignUp/signup.html");
})

app.post("/",function(req,res)
{
    
    console.log(req.body);
    var Name=req.body.Name;
    var email=req.body.email;
  
  
    alert("Data Recieved Thank You \n Name: "+Name+"\n Email: "+email);

    const run = async () => {
        try{
        console.log("check 1 ");
        const response = await client.lists.batchListMembers("0e3849540d", {
          members: [
              {
            email_address:email,
            email_type:"text",
            status:"subscribed",
            merge_fields:{
              "NAME":Name,
              "EMAIL":email
          }
        }
        ],
        });
        console.log(response);
        res.sendFile(__dirname+"/success.html");
      }
      catch(error)
      {
        console.log("Error Occured");
        res.sendFile(__dirname+"/faliure.html");
      }
      };
   run();
  
}
)


app.post("/failure",function(req,resp)
{
  resp.redirect("/");
}
)

app.post("/success",function(req,res)
{
  res.redirect("/");
}
)

app.listen(3001)
{
    console.log("Server is running on 3001");
}
 
// API KEY
// 7bc8f31a45e523264ebfc86f8d7d093c-us5

// 