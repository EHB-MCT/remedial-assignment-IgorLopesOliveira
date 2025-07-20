// // dbClient.js
// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config();

// const uri = process.env.MONGO_URI; // your full connection string with password included

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function connect() {
//   try {
//     await client.connect();
//     console.log('✅ MongoDB connected!');
//     return client;
//   } catch (err) {
//     console.error('❌ MongoDB connection error:', err);
//     throw err;
//   }
// }

// module.exports = { connect, client };
