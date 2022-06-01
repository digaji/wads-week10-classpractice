// app.ts
import express, {Request, Response, NextFunction} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { client } from "./database/mongodb";
import { ObjectId } from "mongodb";

const app = express();
dotenv.config();


// Configuration
app.use(express.json());
app.use(cors());

// app.use("/api/auth", auth);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    let body = [];
    return client.connect(async err => {
        // collections are accessed like this
        const collection = client.db("myFirstDatabase").collection("users");
        // perform actions on the collection object
        const cursor = collection.find( {} );
        const allValues = await cursor.toArray();
        return res.status(200).json(allValues);
    });
});

app.get("/hero", async (req: Request, res: Response, next: NextFunction) => {
    return client.connect(async err => {
        // collections are accessed like this
        const collection = client.db("myFirstDatabase").collection("heros");
        // perform actions on the collection object
        const cursor = collection.find( {} );
        const allValues = await cursor.toArray();
        return res.status(200).json(allValues);
    });
});

app.get("/hero/:heroname", async (req: Request, res: Response, next: NextFunction) => {
    return client.connect(async err => {
        const {heroname} = req.params;
        // collections are accessed like this
        const collection = client.db("myFirstDatabase").collection("heros");
        // perform actions on the collection object
        const cursor = collection.find( {heroname: heroname} );
        const allValues = await cursor.toArray();
        return res.status(200).json(allValues);
    });
});

app.post("/hero", async (req: Request, res: Response, next: NextFunction) => {
    return client.connect(async err => {
        // console.log(req.body)
        // collections are accessed like this
        const collection = client.db("myFirstDatabase").collection("heros");
        // perform actions on the collection object
        const result = await collection.insertOne(req.body);
        return res.status(200).json(result.insertedId);
    });
});

app.put("/hero/:heroname", async (req: Request, res: Response, next: NextFunction) => {
    return client.connect(async err => {
        const {realname} = req.body;
        const {heroname} = req.params;
        // collections are accessed like this
        const collection = client.db("myFirstDatabase").collection("heros");
        const query = {
            heroname: heroname,
        };
        const update = {
            $set: {
                realname: realname
            }
        }
        // If the data does not exist then it will be inserted as well
        const result = await collection.updateOne(query, update, { upsert: true });
        return res.status(200).json(result.modifiedCount);
    });
});

app.delete("/hero/:heroid", async (req: Request, res: Response, next: NextFunction) => {
    return client.connect(async err => {
        const {heroid} = req.params;
        const doc = {
            _id: new ObjectId(heroid),
        }
        // collections are accessed like this
        const collection = client.db("myFirstDatabase").collection("heros");
        // perform actions on the collection object
        const result = await collection.deleteOne(doc);
        return res.status(200).json(result.deletedCount);
    });
});

// listen on port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Application listening at http://localhost:${PORT}`));