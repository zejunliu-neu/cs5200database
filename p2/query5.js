const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'p2';

async function main(filter, options) {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('city');

    //Query5: updating a document based on a query parameter
    // (e.g. flipping on or off a boolean attribute for a document, such as enabling/disabling a song)
    const findResult = await collection.findOneAndUpdate(
        {"_id": "01001"},
        {$inc: {"pop": 10}}
    );
    console.log('Found documents =>', findResult);


    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());