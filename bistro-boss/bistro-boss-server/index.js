const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vv6xnmz.mongodb.net/?retryWrites=true&w=majority`;

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
        const MenuDB = client.db("Bistro-BossDB").collection("menu");
        const ReviewDB = client.db("Bistro-BossDB").collection("reviews");
        const addCartDB = client.db("Bistro-BossDB").collection("carts");
        app.get("/menu", async (req, res) => {
            const result = await MenuDB.find().toArray();
            res.send(result);
        });
        app.get("/review", async (req, res) => {
            const result = await ReviewDB.find().toArray();
            res.send(result);
        });
        app.post("/cart", async (req, res) => {
            const cartData = req.body;
            const result = await addCartDB.insertOne(cartData);
            res.send(result);
        });
        app.get("/cart", async (req, res) => {
            const userEmail = req.query.email;
            console.log(userEmail);
            if (!userEmail) {
                res.send([]);
            }
            const query = { email: userEmail };
            const result = await addCartDB.find(query).toArray();
            res.send(result);
        });
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('boss is sitting')
})

app.listen(port, () => {
    console.log(`Bistro boss is sitting on port ${port}`);
})