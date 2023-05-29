const express = require('express')
const cors = require('cors');
var jwt = require('jsonwebtoken');
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
const verifyJwt = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.status(401).send({ error: true, message: "user is unauthorized" })
        return;
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).send({ error: true, message: "user is unauthorized" })
            return;
        }
        req.decoded = decoded;
        next();
    })
}
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const carDocCollection = client.db('carDocDB').collection('carDoc');
        const carBookCollection = client.db('carDocDB').collection('serviceBooking');
        app.post("/jwt", (req, res) => {
            const user = req.body;
            console.log(user);
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            });
            res.send({ token });
        })
        app.get("/services", async (req, res) => {
            const cursor = carDocCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get("/services/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = {
                projection: { title: 1, price: 1, service_id: 1, img: 1 }
            }
            const result = await carDocCollection.findOne(query, options);
            res.send(result);
        })
        app.post("/bookings", async (req, res) => {
            const bookings = req.body;
            const result = await carBookCollection.insertOne(bookings);
            res.send(result);
        });
        app.get("/bookings", verifyJwt, async (req, res) => {
            console.log("come back after verification")
            let query = {};
            if (req.query?.email) {
                query = { email: req.query.email }
            }
            const result = await carBookCollection.find(query).toArray();
            res.send(result);
        })
        app.delete('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await carBookCollection.deleteOne(query);
            res.send(result);
        });
        app.patch("/bookings/:id", async (req, res) => {
            const id = req.params.id;
            const bookings = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateBooking = {
                $set: {
                    status: bookings.status
                },
            }
            const result = await carBookCollection.updateOne(filter, updateBooking);
            res.send(result);
        })
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
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})