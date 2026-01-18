
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

export const collections = {
    PRODUCTS: 'products',
    CART: 'cart',
    USERS: 'users',
    ORDER: 'orders',
};
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const dbConnect = (cname) => {
    return client.db(dbName).collection(cname);
}