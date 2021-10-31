let express = require("express");
let router = express.Router();

const myDB = require("../db/airbnbSQLiteDB.js");

/*Get all district*/
router.get("/", async function (req, res) {
  console.log("Got request for /");
  const districts = await myDB.getDistricts();
  console.log("got districts", districts);


  const hostresponsetimes = await myDB.getAllHostResponseTime();
  console.log("got hostresponsetimes", hostresponsetimes);
  // render districts and hostresponsetimes
  res.render("index", { districts: districts, hostresponsetimes: hostresponsetimes,});
});

/* GET a single district. */
router.get("/districts/:districtId", async function (req, res) {
  console.log("Got district details");
  const districtId = req.params.districtId;
  console.log("got district details ", districtId);
  const district = await myDB.getDistrictByID(districtId);
  console.log("district created");
  res.render("districtDetails", {district: district});
});

/* POST create district. */
router.post("/districts/create", async function (req, res) {
  console.log("Got post create/district");
  const district = req.body;
  console.log("got create district", district);
  await myDB.createDistrict(district);
  console.log("District created");
  res.redirect("/");
});

/* POST delete district. */
router.post("/districts/delete", async function (req, res) {
  console.log("Got post delete district");
  const district = req.body;
  console.log("got delete district", district);
  await myDB.deleteDistrict(district);
  console.log("District deleted");
  res.redirect("/");
});

/* Update district. */
router.post("/districts/update", async function (req, res) {
  console.log("Got post update districts");
  const district = req.body;
  console.log("got update district", district);
  await myDB.updateDistrict(district);
  console.log("district updated");
  res.redirect("/");
});



/* GET a single host response time. */
router.get("/hostresponsetimes/:hostResponseTimeId", async function (req, res) {
  console.log("Got district details");
  const hostResponseTimeId = req.params.hostResponseTimeId;
  console.log("got district details ", hostResponseTimeId);
  const hostResponseTime = await myDB.getHostResponseTimeByID(hostResponseTimeId);
  console.log("district created");
  res.render("hostResponseTimeDetails", {hostResponseTime: hostResponseTime});
});

/* POST create hostresponsetimes. */
router.post("/hostresponsetimes/create", async function (req, res) {
  console.log("Got post create/district");
  const hostResponseTime = req.body;
  console.log("got create district", hostResponseTime);
  await myDB.createHostResponseTime(hostResponseTime);
  console.log("District created");
  res.redirect("/");
});

/* POST delete hostresponsetimes. */
router.post("/hostresponsetimes/delete", async function (req, res) {
  console.log("Got post delete district");
  const hostResponseTime = req.body;
  console.log("got delete district", hostResponseTime);
  await myDB.deleteHostResponseTime(hostResponseTime);
  console.log("District deleted");
  res.redirect("/");
});

/* Update districts. */
router.post("/hostresponsetimes/update", async function (req, res) {
  console.log("Got post update districts");
  const hostResponseTime = req.body;
  console.log("got update district", hostResponseTime);
  await myDB.updateHostResponseTime(hostResponseTime);
  console.log("district updated");
  res.redirect("/");
});
module.exports = router;
