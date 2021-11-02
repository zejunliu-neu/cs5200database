BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Neighborhood" (
	"neighborhoodId"	INTEGER,
	"latitude"	REAL,
	"longitude"	REAL,
	"neighborhood_overviewId"	TEXT,
	"districtId"	INTEGER
);
CREATE TABLE IF NOT EXISTS "Host" (
	"hostId"	INTEGER NOT NULL,
	"hostURL"	TEXT,
	"hostName"	TEXT,
	"hostSince"	TEXT,
	"hostAbout"	TEXT,
	"hostResponseTimeId"	INTEGER,
	"hostResponseRate"	TEXT,
	"hostAcceptanceRate"	TEXT,
	"hostIsSuperhost"	TEXT,
	"hostPictureURL"	TEXT,
	"hostNeighbourhood"	INTEGER,
	"hostListingsCount"	INTEGER,
	"hostIdentityVerified"	TEXT,
	"districtId"	INTEGER,
	PRIMARY KEY("hostId" AUTOINCREMENT),
	FOREIGN KEY("districtId") REFERENCES "District"("districtId") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "District" (
	"districtId"	INTEGER,
	"districtName"	TEXT,
	PRIMARY KEY("districtId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "HostResponseTime" (
	"hostResponseTimeId"	INTEGER NOT NULL,
	"hostResponseTime"	TEXT,
	PRIMARY KEY("hostResponseTimeId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "PropertyType" (
	"propertyTypeID"	INTEGER NOT NULL,
	"propertyTypeName"	TEXT,
	PRIMARY KEY("propertyTypeID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Review" (
	"reviewID"	INTEGER NOT NULL,
	"lastReviewTime"	TEXT,
	"reviewNum"	REAL,
	"reviewScoreRating"	REAL,
	"reviewScoreAccuracy"	REAL,
	"reviewScoreCleanliness"	REAL,
	"reviewScoreCheckin"	REAL,
	"reviewScoreLocation"	REAL,
	"reviewScoreValue"	REAL,
	"reviewPerMonth"	REAL,
	PRIMARY KEY("reviewID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Room" (
	"roomID"	INTEGER NOT NULL,
	"name"	TEXT,
	"description"	TEXT,
	"pictureURL"	TEXT,
	"roomTypeID"	INTEGER,
	"accommodateNum"	INTEGER,
	"bathroom"	TEXT,
	"bedroomNum"	INTEGER,
	"bedsNum"	INTEGER,
	"pricePerNight"	INTEGER,
	"minimumNight"	INTEGER,
	"maximumNight"	INTEGER,
	"reviewID"	INTEGER,
	"hostID"	INTEGER,
	"availability365"	INTEGER,
	"license"	TEXT,
	"propertyTypeID"	INTEGER,
	"neighborhoodID"	INTEGER,
	"instantBookable"	TEXT,
	PRIMARY KEY("roomID" AUTOINCREMENT),
	FOREIGN KEY("reviewID") REFERENCES "Review"("reviewID") ON DELETE SET NULL,
	FOREIGN KEY("propertyTypeID") REFERENCES "PropertyType"("propertyTypeID") ON DELETE SET NULL,
	FOREIGN KEY("roomTypeID") REFERENCES "RoomType"("roomTypeID") ON DELETE SET NULL,
	FOREIGN KEY("hostID") REFERENCES "Host"("hostId") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "RoomType" (
	"roomTypeID"	INTEGER NOT NULL,
	"roomTypeName"	TEXT,
	PRIMARY KEY("roomTypeID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Listing" (
	"listingId"	INTEGER NOT NULL,
	"listingURL"	TEXT,
	"neighborhoodId"	INTEGER,
	"roomId"	INTEGER,
	"reviewId"	INTEGER,
	PRIMARY KEY("listingId" AUTOINCREMENT),
	FOREIGN KEY("roomId") REFERENCES "Room"("roomID") ON DELETE SET NULL,
	FOREIGN KEY("reviewId") REFERENCES "Review" ON DELETE SET NULL,
	FOREIGN KEY("neighborhoodId") REFERENCES "Neighborhood"("neighborhoodId") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "Unit" (
	"listingID"	INTEGER NOT NULL,
	"hostID"	INTEGER NOT NULL,
	PRIMARY KEY("listingID","hostID"),
	FOREIGN KEY("listingID") REFERENCES "Listing"("listingId") ON DELETE SET NULL,
	FOREIGN KEY("hostID") REFERENCES "Host"("hostId") ON DELETE CASCADE
);
COMMIT;




-- 1. one query must contain a join of at least three tables
select * from Listing
INNER JOIN Unit ON Listing.listingId=Unit.listingID
INNER join Review on Listing.reviewId =Review.reviewID
INNER Join Room on Room.roomId =Listing.roomId 
LIMIT 2;
 
-- 2. one must contain a subquery
SELECT Room.name
FROM Room
WHERE Room.neighborhoodID 
IN (
SELECT  Neighborhood.neighborhoodId
FROM Neighborhood
WHERE Neighborhood.districtId >=1 AND Neighborhood.districtId <= 10 );
 
 
-- 3. one must be a group by with a having clause
Select HostResponseTime, COUNT(HostResponseTime)
from Host 
inner join(HostResponseTime) 
on Host.hostResponseTimeId==HostResponseTime.hostResponseTimeId
GROUP By HostResponseTime HAVING COUNT(HostResponseTime) > 70;
 
 
-- 4. one must contain a complex search criterion (more than one expression with logical connectors). Experiment with advanced query mechanisms such as RCTE, PARTITION BY, or SELECT CASE/WHEN.
SELECT name, pricePerNight,
CASE
    WHEN pricePerNight > 150 THEN 'The price is greater than $180 per night'
    WHEN pricePerNight = 30 THEN 'The price is 180'
    ELSE 'The price is under 180'
END AS priceText
FROM Room;
 
 -- 5. 
select districtName, Count(districtName) as number 
From Host
INNER join District on District.districtId == Host.districtId
GROUP BY districtName ORDER BY districtName ASC;
 
