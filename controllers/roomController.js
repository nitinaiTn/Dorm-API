const express = require("express");
const router = express.Router();
const connection = require("../config/db");

/* GET home page. */
router.get("/:property_id", (req, res) => {
  const propertyId = req.params.property_id;
  connection.query(
    `SELECT number_of_floors, number_of_rooms FROM Properties WHERE property_id = ${propertyId}`,
    (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send(`Property with ID ${propertyId} not found`);
      } else {
        const numberOfFloors = result[0].number_of_floors;
        const roomsPerFloor = result[0].number_of_rooms;
        for (let i = 1; i <= numberOfFloors; i++) {
          for (let j = 1; j <= roomsPerFloor; j++) {
            const floorNumber = i;
            const roomNumber = j;
            
            // Insert room record
            const roomSql = `INSERT INTO Rooms (floor_number, room_number, room_status, property_id)
                              VALUES (${floorNumber}, ${roomNumber}, 'free', ${propertyId})`;
            connection.query(roomSql, (err, result) => {
              if (err) throw err;
              
              // Get the ID of the newly inserted room
              const roomId = result.insertId;
              
              console.log(`Room ${roomNumber} on floor ${floorNumber} created with ID ${roomId}`);
              
              // Insert user record with the room ID
              const userSql = `INSERT INTO Users (username, room_id, property_id)
                                VALUES (${floorNumber}+${roomNumber}, ${roomId}, ${propertyId})`;
              connection.query(userSql, (err, result) => {
                if (err) throw err;
                console.log(`User record created for room ${roomNumber} on floor ${floorNumber}`);
              });
            });
          }
        }
      }
    }
  );
});

module.exports = router;