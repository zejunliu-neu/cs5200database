const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URL || "mongodb://localhost:27017";
const DB_NAME = "p2";
const COL_NAME = "city";

async function getReferences(query, page, pageSize) {
  console.log("getReferences", query);

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const queryObj = {city: { $regex: `^${query}`, $options: "i"}};

    return await client
      .db(DB_NAME)
      .collection(COL_NAME)
      .find(queryObj)
      .sort({ created_on: -1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .toArray();
  } finally {
    client.close();
  }
}

async function getReferencesCount(query) {
  console.log("getReferencesCount", query);

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const queryObj = {city: { $regex: `^${query}`, $options: "i" },
    };
    return await client.db(DB_NAME).collection(COL_NAME).find(queryObj).count();
  } finally {
    client.close();
  }
}

async function getReferenceByID(reference_id) {
  console.log("getReferenceByID", reference_id);

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const queryObj = {
      //_id: new ObjectId(reference_id),
      _id: reference_id,
      // reference_id: +reference_id,
    };

    return await client.db(DB_NAME).collection(COL_NAME).findOne(queryObj);
  } finally {
    client.close();
  }
}

async function updateReferenceByID(reference_id, ref) {
  console.log("updateReferenceByID", reference_id, ref);

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const queryObj = {
      _id: reference_id,
    };

    // If tags is a string convert it to an array
    if (typeof ref.tags === "string") {
      ref.tags = ref.tags.split(",").map((t) => t.trim()); // removes whitespace
    }

    return await client
      .db(DB_NAME)
      .collection(COL_NAME)
      .updateOne(queryObj, { $set: ref });
  } finally {
    client.close();
  }
}

async function deleteReferenceByID(reference_id) {
  console.log("deleteReferenceByID", reference_id);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const queryObj = {_id: reference_id,};
    return await client
      .db(DB_NAME)
      .collection(COL_NAME)
      .findOneAndDelete(queryObj);
  } finally {
    client.close();
  }
}

async function insertReference(ref) {
  console.log("insertReference", ref);
  const client = new MongoClient(uri);
  try {
    await client.connect();
    return await client
      .db(DB_NAME)
      .collection(COL_NAME)
      .insertOne(ref);
  } finally {
    client.close();
  }
}

module.exports.getReferences = getReferences;
module.exports.getReferencesCount = getReferencesCount;
module.exports.insertReference = insertReference;
module.exports.getReferenceByID = getReferenceByID;
module.exports.updateReferenceByID = updateReferenceByID;
module.exports.deleteReferenceByID = deleteReferenceByID;
