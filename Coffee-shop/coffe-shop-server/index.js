const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vv6xnmz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const coffeeCollection = client.db('coffeeDB').collection('coffees');
        app.get('/coffees', async (req, res) => {
            const cursor = coffeeCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });
        app.get('/coffees/:id', async (req, res) => {
            const userId = req.params.id;
            const query = { _id: new ObjectId(userId) };
            const result = await coffeeCollection.findOne(query);
            res.send(result);
        });
        app.delete('/coffees/:id', async (req, res) => {
            const userId = req.params.id;
            const query = { _id: new ObjectId(userId) }
            const result = await coffeeCollection.deleteOne(query);
            res.send(result);
        });
        app.put('/updatecoffee/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateUser = {
                $set: {
                    name: user.name,
                    quantity: user.quantity,
                    supplier: user.supplier,
                    taste: user.taste,
                    category: user.category,
                    details: user.details,
                    photo: user.photo
                }
            }
            const result = coffeeCollection.updateOne(filter, updateUser, options);
            res.send(result);
        })
        app.post('/addcoffee', async (req, res) => {
            const user = req.body;
            console.log("new user:", user);
            const result = coffeeCollection.insertOne(user);
            res.send(result);
        });
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello the the coffee shop server!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})