const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Top Anime')
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})

const {MongoClient, ObjectId} = require('mongodb');
// const uri = 'mongodb://localhost:27017';
const uri = "mongodb://127.0.0.1:27017/";

// const connectDB = async() => {
//     try {
//         const client = new MongoClient(uri);
//         await client.connect();
//         console.log('MongoDB is now conneted.')

//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

// connectDB();



app.get('/Llist', async(req, res) => {
    let {skip, limit} = req.query
    console.log({skip, limit})    
    

    const client = new MongoClient(uri);
    await client.connect();
    //const objects = await client.db('mini_project').collection('layoffs2022').find({}).limit(10).toArray();
    //const objects = await client.db('mydb').collection('s_collection').find({}).sort({"GPA": -1}).limit(10).toArray();

    //const objects = await client.db('mini_project').collection('layoffs2022').aggregate([ { $sample: { size: 1695 } } ]).sort({"total_laid_off": -1}).toArray();
    const objects = await client.db('mini_project').collection('layoffs2022').find({
        $and: [
            { percentage_laid_off: { $not: { $eq: null } } },
            { stage: { $not: { $eq: "Unknown" } } },
            // { total_laid_off: {$not: {$eq: null}}}
        ]
    }).project({stage:0, funds_raised:0}).skip(Number(skip)).limit(Number(limit)).sort({"total_laid_off": -1}).toArray();
    // const objects = await client.db('mini_project').collection('layoffs2022').find({
        
    // }).project({stage:0, funds_raised:0}).skip(Number(skip)).limit(Number(limit)).sort({"total_laid_off": -1}).toArray();
    await client.close();

    res.status(200).send(objects);
})

app.post('/Llist/create', async(req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mini_project').collection('layoffs2022').insertOne({
        "company": object["company"],
        "location": object["location"],
        "industry": object["industry"],
        "total_laid_off": parseInt(object["total_laid_off"]),
        "percentage_laid_off": parseFloat(object["percentage_laid_off"]),
        "date": object["date"],
        "stage": object["stage"],
        "country": object["country"],
        "funds_raised": object["funds_raised"]
    });

    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object is created",
        "object": object['company']
    })
})

app.put('/Llist/update', async(req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mini_project').collection('layoffs2022').updateOne({'_id': ObjectId(id)}, 
    {
        $set: {
            "company": object["company"],
            "location": object["location"],
            "industry": object["industry"],
            "total_laid_off": parseInt(object["total_laid_off"]),
            "percentage_laid_off": parseFloat(object["percentage_laid_off"]),
            "date": object["date"],
            "stage": object["stage"],
            "country": object["country"],
            "funds_raised": object["funds_raised"]
    },

});
    await client.close();
    res.status(200).send({
        'status': "ok",
        'message': "Object with ID "+id+" is updated.",
        'Name': object['company']
    });
})

app.delete('/Llist/delete', async(req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mini_project').collection('layoffs2022').deleteOne({"_id": ObjectId(id)});
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID"+ id + " is deleted."
    });
})


app.get('/Llist/industry/:searchText', async(req, res) => {
        const { params } = req;
        const searchText = params.searchText
        const client = new MongoClient(uri);
        await client.connect();
        const objects = await client.db('mini_project').collection('layoffs2022').find({ $text: {$search: searchText } }).sort({ "Date received": -1 }).limit(5).toArray();
        await client.close();
        if(searchText == "") {
            res.status(404).send({message: 'user does not exist'});

        }

        // if (objects.length == 0) { // คือ ถ้าไม่มีข้อมูล
        //     res.status(404).send({message: 'user does not exist'});
        // }
        else {
            res.status(200).send({ 
              "status": "ok",
              "searchText": searchText,
              "Complaint": objects
            });
            }
      })

app.get('/Llist/:id', async(req, res) => {
        const id = req.params.id;
        const client = new MongoClient(uri);
        await client.connect();
        const object = await client.db('mini_project').collection('layoffs2022').findOne({ "_id": ObjectId(id) });
        await client.close();
        res.status(200).send({
            "status": "ok",
            "ID": id,
            "Complaint": object
        });
    })

    app.get('/showGraph', async (req, res) => {
        const client = new MongoClient(uri);
        await client.connect();
        const objects = await client.db('mini_project').collection('layoffs2022').find({}).toArray();
        await client.close();
        res.status(200).send(objects);
    });

    