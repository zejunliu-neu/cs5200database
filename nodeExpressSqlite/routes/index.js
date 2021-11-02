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

  const reviews = await myDB.getReviews();

  const roomType = await myDB.getRoomType();
  res.render("index", { districts: districts, hostresponsetimes: hostresponsetimes, 
                        reviews: reviews, roomTypes: roomType});
});

/* ---------Districts related functions starts from here -----------------*/

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


/* ---------Hosts related functions starts from here -----------------*/
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








/* ---------Reviews related functions starts from here -----------------*/
// router.get("/review", async function (req, res) {
//   console.log("Got request for /");

//   const reviews = await myDB.getReviews();

//   // render the _index_ template with the reviews attrib as the list of reviews
//   res.render("index-reviews", { reviews: reviews});
// });



/* GET review details. */
router.get("/review/:reviewID", async function (req, res) {
  console.log("Got review details");

  const reviewID = req.params.reviewID;

  console.log("got reviewID ", reviewID);

  const review = await myDB.getReviewByID(reviewID);

  console.log("got review by id");

  res.render("reviewDetails", {review: review});
});



/* POST create reviews. */
router.post("/review/create", async function (req, res) {
  console.log("Got post create/review");

  const review = req.body;

  console.log("got create review", review);

  await myDB.createReview(review);

  console.log("reviews created");

  res.redirect("/");
});

/* POST delete reviews. */
router.post("/review/delete", async function (req, res) {
  console.log("Got post delete review");

  const review = req.body;

  console.log("got delete review", review);

  await myDB.deleteReview(review);

  console.log("review deleted");

  res.redirect("/");
});


/* POST update reviews. */
router.post("/review/:reviewID", async function (req, res) {
  console.log("Got post update review");

  const review = req.body;

  console.log("got update review", review);

  await myDB.updateReview(review);

  console.log("review updated");

  res.redirect("/");
});



/* ---------Roomtype related functions starts from here -----------------*/
// /* GET home page. */
// router.get("/roomType", async function (req, res) {
//   console.log("Got request for /");

//   const roomType = await myDB.getRoomType();

//   console.log("got roomTypes", roomType);

//   // render the _index_ template with the roomTypes attrib as the list of roomTypes
//   res.render("index-roomType", { roomTypes: roomType});
// });





/* GET roomTypes details. */
router.get("/roomType/:roomTypeID", async function (req, res) {
  console.log("Got roomType details");

  const roomTypeID = req.params.roomTypeID;

  console.log("got roomType ", roomTypeID);

  const roomType = await myDB.getRoomTypeByID(roomTypeID);

  console.log("got roomType by id");

  res.render("roomTypeDetails", {roomType: roomType});
});

/* POST create roomTypes. */
router.post("/roomType/create", async function (req, res) {
  console.log("Got post create/roomType");

  const roomType = req.body;

  console.log("got create roomType", roomType);

  await myDB.createRoomType(roomType);

  console.log("roomTypes created");

  res.redirect("/");
});

/* POST delete roomTypes. */
router.post("/roomType/delete", async function (req, res) {
  console.log("Got post delete roomType");

  const roomType = req.body;

  console.log("got delete roomType", roomType);

  await myDB.deleteRoomType(roomType);

  console.log("roomType deleted");

  res.redirect("/");
});


/* POST update roomTypes. */
router.post("/roomType/:roomTypeID", async function (req, res) {
  console.log("Got post update roomType");

  const roomType = req.body;

  console.log("got update roomType", roomType);

  await myDB.updateRoomType(roomType);

  console.log("roomType updated");

  res.redirect("/");
});



module.exports = router;




