const express = require("express");
const router = express.Router();
const connection = require("../config/db");

/* GET home page. */
router.get('/:propertyId', (req, res) => {
  const propertyId = req.params.propertyId;
  const query = 'SELECT * FROM Rooms WHERE property_id = ?';

  connection.query(query, [propertyId], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching rooms');
    } else {
      res.json(rows);
    }
  });
});



router.post("/:property_id", (req, res) => {
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

              let password = '';
              const chars = '0123456789';
              for (let i = 0; i < 4; i++) {
                password += chars[Math.floor(Math.random()  * 9000 + 1000)];
              }
              
              // Insert user record with the room ID
              const userSql = `INSERT INTO Users (username, room_id, property_id, role, password)
                                VALUES ('${roomNumber}ABC', ${roomId}, ${propertyId}, 'user', ${password})`;
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