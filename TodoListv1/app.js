const express=require("express");
const app=express();
const mongoose=require("mongoose");
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb+srv://admin-mukul:muk6217@cluster0.pe4ti.mongodb.net/toDoList?retryWrites=true&w=majority");

const itemSchema = new mongoose.Schema(
    {
        name:String
    }
);

const listSchema= new mongoose.Schema(
    {
        listname:String,
        listdata:[itemSchema]
    }
);



const listModel =mongoose.model("toDo",listSchema);  

const elem1=
    {
        name:"HomeWork"
    }

const elem2=
    {
        name:"ClassWork"
    }

const elem3=
    {
        name:"LabWork"
    }

var list_elements=[elem1,elem2,elem3];

var def_list=new listModel(
    {
        listname:"general",
        listdata:list_elements
    }
)
    
def_list.save();

app.get("/",function(req,res)
{
   
    listModel.find({listname:"general"},function(err,result)
    {
        if(err)
         console.log(err);
        else
        {   console.log(result);
            res.render('gen', {gern: result[0].listdata,list_name:"general"});
        }
    }
    )
})

app.post("/",function(req,res)
    { 
       console.log(req.body);
        var item=req.body.work;
        var list=req.body.button;

        const elem1={
            name:item
        }

       const resu= listModel.updateOne(
            {
                "listname" : list
            },
           { 
               "$push":
               { "listdata": elem1
                }
            
            },
            function (err, raw) {
                    // if (err) return handleError(err);
                    // console.log('The raw response from Mongo was ', raw);
            }
        );
        if(list!="general")
        res.redirect("/"+list);
        else
        res.redirect("/");

    }
)

app.post("/delete",function(req,res)
{
    for(const key in req.body)
    {
       
        const resu= listModel.updateOne(
            {
                "listname" : key
            },
           { 
               "$pull":
               { "listdata": {"_id":req.body[key]}
                }
            
            },
            function (err, raw) {
                    if (err) console.log(err);
                    console.log('The raw response from Mongo was ', raw);
            }
        );

        if(key!="general")
        res.redirect("/"+key);
        else
        res.redirect("/");
    }
    // listModel.deleteOne({_id:keys},function(err)
    // {
    //     if(err)
    //     console.log(err);
    //     else
    //     console.log("deleted item");
    // })
}
)

app.get("/:title",function(req,res)
{
    var title=req.params.title;
    
    listModel.find({"listname":title},function(err,result)
    {
        if (err) console.log(err) ;
        else 
        {
            if(result.length==0)
            {   
                    console.log("check");
                    var te=new listModel(
                        {
                            "listname":title,
                            "listdata":[]
                        }
                    )
                    console.log("saving ... ")
                    te.save(function(err,res)
                    {
                        if(err)console.log("errroe in saving");
                        else   
                        console.log("result" +res);
                    });
                    res.redirect("/"+title);
            }
            else
            res.render('gen', {gern: result[0].listdata,list_name:title}); 
            
        }
        }
    )
}
)

app.post("/:title",function(req,res)
{   

}
)


let port = process.env.PORT || 4000;


app.listen(port,function()
{
    console.log("Server is running");
}
)

