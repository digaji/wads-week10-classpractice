import { MongoClient, ServerApiVersion } from 'mongodb';
const password = "Mswgz0VtnOZM4J2c";
const uri = `mongodb+srv://user0:${password}@cluster0.fb4hf.mongodb.net/?retryWrites=true&w=majority`;
// @ts-ignore
// Nggak mau nganu dianya
export const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
