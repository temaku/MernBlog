const express = require("express");
const app = express();
const {MongoClient} = require("mongodb");
app.use(express.json({ extended:false}))
const PORT = process.env.PORT || 8000



const withDb = async(operations,res)=>{
    try{
        const client = await MongoClient.connect('')
        const db = client.db('mernblog')
        await operations(db)
        client.close();

    }catch(error){
        res.status(500).json({message:"Error connecting to the database",error})
    }
}

// app.get('/',(req,res)=>res.send("Hello world!"))
// app.post('/',(req,res)=>res.send(`Hello ${req.body.name}`))
// app.post('/hello/:name',(req,res)=>res.send(`hello ${req.params.name}
// `))

app.get('/api/articles/:name', async(req,res)=>{
 
    withDb(async (db)=>{
        const articleName = req.params.name;
        const articleInfo = await db.collection("articles").findOne({name:articleName});
        res.status(200).json(articleInfo);
    },res)
});
app.post('/api/articles/:name/add-comments',(req,res)=>{
   const {username,text} = req.body;
   const articleName = req.params.name;
   withDb(async(db)=>{
    const articleInfo = await db.collection("articles").
    findOne({name:articleName});

    await db.collection("articles").updateOne(
        {name:articleName},
        {
            $set:{
                comments :articleInfo.comments.concat({username,text})
            }
        }
    );
    const updateArticleInfo = await db.
    collection("articles").findOne({name:articleName});
    res.status(200).json(updateArticleInfo)

   },res)


})

app.listen(PORT,()=>console.log(`Server is started at ${PORT}`));