import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI;

// collections name
export const collectionsName = {
    USERS: "users"
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const dbConnect = async (collection_name) => {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return client.db(process.env.DB_NAME).collection(collection_name);
}

export default dbConnect;