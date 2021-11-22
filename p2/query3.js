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

    //Query3: one should be counting documents for an specific user

    const findResult = await collection.aggregate([
        {$match:
                {state:{$eq:"CA"}}
        },
        {$group:{_id:"$state", total:{$sum:1}}},

    ]).toArray();
    //const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());