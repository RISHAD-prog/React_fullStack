const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const stripe = require('strip')(process.env.PAYMENT_SECRECT_KEY);
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());
const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'unauthorized access' });
    }
    // bearer token
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
    })
}
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
        const UserDB = client.db("Bistro-BossDB").collection("user");
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email }
            const user = await UserDB.findOne(query);
            if (user?.role !== 'admin') {
                return res.status(403).send({ error: true, message: 'forbidden message' });
            }
            next();
        }
        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.send({ token });
        })
        app.get("/users", verifyJWT, verifyAdmin, async (req, res) => {
            const result = await UserDB.find().toArray();
            res.send(result);
        })
        app.post("/users", async (req, res) => {
            const user = req.body;
            const query = { email: user?.email, name: user?.name };
            const existingUser = await UserDB.findOne(query);
            if (existingUser) {
                return res.send("user is already there");
            }
            const result = await UserDB.insertOne(user);
            return res.send(result);
        });
        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await UserDB.deleteOne(query);
            res.send(result);
        })
        app.patch("/users/admin/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    role: 'admin',
                },
            };
            const result = await UserDB.updateOne(query, updateDoc);
            res.send(result);
        });
        app.get("/users/admin/:email", verifyJWT, async (req, res) => {
            const email = req.params.email;

            if (req.decoded.email !== email) {
                res.send({ admin: false })
            }

            const query = { email: email }
            const user = await UserDB.findOne(query);
            const result = { admin: user?.role === 'admin' }
            res.send(result);
        });
        app.delete("/menu/:id", verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await MenuDB.deleteOne(query);
            res.send(result);
        })
        app.get("/menu", async (req, res) => {
            const result = await MenuDB.find().toArray();
            res.send(result);
        });
        app.post('/menu', verifyJWT, verifyAdmin, async (req, res) => {
            const items = req.body;
            const result = await MenuDB.insertOne(items);
            res.send(result);
        })
        app.get("/review", async (req, res) => {
            const result = await ReviewDB.find().toArray();
            res.send(result);
        });
        app.post("/carts", async (req, res) => {
            const cartData = req.body;
            const result = await addCartDB.insertOne(cartData);
            res.send(result);
        });
        app.get("/carts", verifyJWT, async (req, res) => {
            const userEmail = req.query.email;
            console.log(userEmail);
            if (!userEmail) {
                res.send([]);
            }
            const decodedEmail = req.decoded.email;
            if (decodedEmail !== userEmail) {
                return res.status(403).send({ error: true, message: 'forbidden access' })
            }
            const query = { email: userEmail };
            const result = await addCartDB.find(query).toArray();
            res.send(result);
        });
        app.delete("/carts/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await addCartDB.deleteOne(query);
            res.send(result);
        });
        app.post("/create-payment-intent", async (req, res) => {
            const { price } = req.body;
            const paymentIntent = await stripe.paymentIntents.create({
                price: price * 100,
                currency: "usd",
                payment_method_types:
                    ['card']
            });
            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        })
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