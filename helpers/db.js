import { MongoClient } from 'mongodb';




export async function connectToDb(){
    const client = new MongoClient(`mongodb+srv://amank23:Abcd1234@devconnector.il55c.mongodb.net/events?retryWrites=true&w=majority` );
     return await client.connect();
}

export async function insertIntoDB(collectionName, collectionObject, client){
    const db = client.db();
    const res = await db.collection(collectionName).insertOne(collectionObject);
    await client.close();

    return res;
}

export async function getFromDb(collectionName, filter, client){
    const db = client.db();
    const data = await db.collection(collectionName).find(filter).sort({ _id: -1 }).toArray();
    await client.close();
    return data;
}   