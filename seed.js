// seed.js
const { connect, client } = require('./dbClient');

async function seed() {
  try {
    await connect();

    const db = client.db('DEV5'); // your DB name from MongoDB Atlas

    // Clear collections if they exist
    await db.collection('users').deleteMany({});
    await db.collection('resources').deleteMany({});

    // Seed users
    const users = [
      {
        name: "Alice",
        balance: 1000,
        inventory: { wheat: 10, gold: 2, tech: 1 }
      },
      {
        name: "Bob",
        balance: 1200,
        inventory: { wheat: 5, gold: 3, tech: 0 }
      }
    ];

    await db.collection('users').insertMany(users);

    // Seed resources
    const resources = [
      { name: "wheat", basePrice: 10, currentPrice: 10, stock: 500 },
      { name: "gold", basePrice: 100, currentPrice: 100, stock: 200 },
      { name: "tech", basePrice: 50, currentPrice: 50, stock: 300 }
    ];

    await db.collection('resources').insertMany(resources);

    console.log('🌱 Seed data inserted successfully.');

  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    await client.close();
  }
}

seed();
