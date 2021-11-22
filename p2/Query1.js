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

    //Query1:one query must contain and aggregation
    const findResult = await collection.aggregate([
        {$match: {
                $and:[
                    {city:{$eq:"FLUSHING"}},
                    {state:{$eq:"NY"}}
                ]
            }
        }
    ]).toArray();
    console.log('Found documents =>', findResult);
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());