const express = require("express");
const router = express.Router();

const myDb = require("../db/myMongoDB.js");

/* GET home page. */
router.get("/", async function (req, res) {
  res.redirect("/references");
});

// http://localhost:3000/references?pageSize=24&page=3&q=John
router.get("/references", async (req, res, next) => {
  const query = req.query.q || "";
  const page = +req.query.page || 1;
  const pageSize = +req.query.pageSize || 24;
  const msg = req.query.msg || null;
  console.log("page count: ", page);

  try {
    let total = await myDb.getReferencesCount(query);
    let references = await myDb.getReferences(query, page, pageSize);
    res.render("./pages/index", {
      references,
      query,
      msg,
      currentPage: page,
      lastPage: Math.ceil(total/pageSize),
    });
  } catch (err) {
    next(err);
  }
});


router.get("/references/:reference_id/edit", async (req, res, next) => {
  const reference_id = req.params.reference_id;

  const msg = req.query.msg || null;
  try {

    let ref = await myDb.getReferenceByID(reference_id);
    // let authors = await myDb.getAuthorsByReferenceID(reference_id);
    console.log("edit reference", {ref, msg,});

    res.render("./pages/editReference", {ref, msg,});
  } catch (err) {
    next(err);
  }
});

router.post("/references/:reference_id/edit", async (req, res, next) => {
  const reference_id = req.params.reference_id;
  const ref = req.body;

  try {

    let updateResult = await myDb.updateReferenceByID(reference_id, ref);
    console.log("update", updateResult);

    if (updateResult) {
      res.redirect("/references/?msg=Updated");
    } else {
      res.redirect("/references/?msg=Error Updating");
    }

  } catch (err) {
    next(err);
  }
});

router.get("/references/:reference_id/delete", async (req, res, next) => {
  const reference_id = req.params.reference_id;

  try {

    let deleteResult = await myDb.deleteReferenceByID(reference_id);
    console.log("delete", deleteResult);

    if (deleteResult) {
      res.redirect("/references/?msg=Deleted");
    } else {
      res.redirect("/references/?msg=Error Deleting");
    }

  } catch (err) {
    next(err);
  }
});

router.post("/createReference", async (req, res, next) => {
  const ref = req.body;

  try {
    const insertRes = await myDb.insertReference(ref);

    console.log("Inserted", insertRes);
    res.redirect("/references/?msg=Inserted");
  } catch (err) {
    console.log("Error inserting", err);
    next(err);
  }
});

module.exports = router;
