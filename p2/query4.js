const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'p2';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('city');

    //Query4: top 10 cities with most population

    const findResult = await collection.aggregate([
        {$group: {
                _id: "$city",
                pop_count: {$sum:"$pop"},

            }},
        {$sort:{pop_count:-1}},
        {$limit:10}

    ]).toArray();

    //const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());