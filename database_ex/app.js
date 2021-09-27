const mongoose =require('mongoose');
mongoose.connect("mongodb://localhost:27017/demoDb");


const dbSchema=new mongoose.Schema({
    name:String,
    value:
    {
     type:  Number,
     min:10000,
     max:10002
    }
}) ;

const Mod=mongoose.model("col1",dbSchema);



// const Mod2=mongoose.model("col2",dbSchema)
const doc1=new Mod(
    {
        name:"Chalie",
        value:10022
    }
)

const doc2=new Mod(
    {
        name:"Tango-Chalie",
        value:10023
    }
)

const doc3=new Mod(
    {
        name:"Rider-Tango-Chalie",
        value:10024
    }

)

// \\

// doc3.save();
Mod.deleteMany({name:"Rider-Tango-Chalie"},function(err)
{   if(err)
    console.log(err);
    else
    console.log(err);
})


Mod.find(function(err,mod)
{
    if(err)
    console.log(err);
    else
    {
        // mod.forEach(elem=> 
        //     {
        //         console.log(elem.name);
        //     })

        console.log(mod.length);

    }
});















// const { MongoClient } = require("mongodb");
// // Connection URI
// const uri =
//   "mongodb://localhost:27017";
// // Create a new MongoClient
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify co nnection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);