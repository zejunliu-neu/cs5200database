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

    //Query2: one must contain a complex search criterion (more than one expression with logical connectors)

    const findResult = await collection.find( {
        $and: [
            { $and: [ { pop: { $lt : 40000 } }, { pop : { $gt: 30000 } } ] },
            { $or: [ { city: 'NEW YORK' }, { city:'BRONX' } ] }
        ]
    }).toArray();
    console.log('Found documents =>', findResult);
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());