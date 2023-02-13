const express = require("express");
const router = express.Router();
const connection = require("../config/db");

/* GET home page. */
router.get("/:property_id", (req, res) => {
    const propertyId = req.params.property_id;
    console.log(propertyId)
    // connection.query(
    //   `SELECT number_of_floors, number_of_rooms FROM Properties WHERE property_id = ${propertyId}`,
    //   (err, result) => {
    //     if (err) throw err;
    //     if (result.length === 0) {
    //       res.send(`Property with ID ${propertyId} not found`);
    //     } else {
    //       const numberOfFloors = result[0].number_of_floors;
    //       const roomsPerFloor = result[0].number_of_rooms;
    //       connection.query("TRUNCATE TABLE rooms", (err, result) => {
    //         if (err) throw err;
    //         console.log("Rooms table truncated");
  
    //         for (let i = 1; i <= numberOfFloors; i++) {
    //           for (let j = 1; j <= roomsPerFloor; j++) {
    //             const floorNumber = i;
    //             const roomNumber = j;
    //             const sql = `INSERT INTO Rooms (floor_number, room_number, room_status, property_id)
    //                          VALUES (${floorNumber}, ${roomNumber}, 'free', ${propertyId})`;
    //             connection.query(sql, (err, result) => {
    //               if (err) throw err;
    //               console.log(`Room ${roomNumber} on floor ${floorNumber} created`);
    //             });
    //           }
    //         }
    //         res.send(
    //           `Rooms updated: ${numberOfFloors} floors, ${roomsPerFloor} rooms per floor`
    //         );
    //       });
    //     }
    //   }
    // );
  });
  
  module.exports = router;