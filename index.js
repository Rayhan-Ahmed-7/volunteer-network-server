const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

app.listen(port,()=>{
    console.log('listening to ',port);
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.tdffv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const volunteerCollection = client.db("volunteer").collection("members");
        console.log('connected');
        app.get('/members',async(req,res)=>{
            const query = {};
            const cursor = volunteerCollection.find(query);
            const members = await cursor.toArray();
            res.send(members);
        })
    }
    finally{
        //await client.close();
    }
}

run().catch(console.dir);