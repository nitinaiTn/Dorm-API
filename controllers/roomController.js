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
        
        // Collect all data to be inserted in an array
        const data = [];
        for (let i = 1; i <= numberOfFloors; i++) {
          for (let j = 1; j <= roomsPerFloor; j++) {
            const floorNumber = i;
            const roomNumber = j;
            data.push([floorNumber, roomNumber, 'free', propertyId]);
          }
        }

        // Construct the SQL query with placeholders for the data
        const roomSql = `INSERT INTO Rooms (floor_number, room_number, room_status, property_id)
                          VALUES ?`;
        
        // Execute the batch insert query
        connection.query(roomSql, [data], (err, result) => {
          if (err) throw err;

          // Get the IDs of the newly inserted rooms
          const roomIds = [];
          for (let i = 0; i < result.affectedRows; i++) {
            roomIds.push(result.insertId + i);
          }

          console.log(`Inserted ${result.affectedRows} room records`);
          
          // Generate passwords for each user
          const passwords = [];
          for (let i = 0; i < roomIds.length; i++) {
            let password = '';
            const chars = '0123456789';
            for (let j = 0; j < 4; j++) {
              password += chars[Math.floor(Math.random() * chars.length)];
            }
            passwords.push(password);
          }

          // Collect user data to be inserted in an array
          const userData = [];
          for (let i = 0; i < roomIds.length; i++) {
            const roomNumber = data[i][1];
            const username = `${roomNumber}ABC`;
            const roomId = roomIds[i];
            const password = passwords[i];
            userData.push([username, roomId, propertyId, 'user', password]);
          }

          // Construct the SQL query with placeholders for the user data
          const userSql = `INSERT INTO Users (username, room_id, property_id, role, password)
                            VALUES ?`;

          // Execute the batch insert query
          connection.query(userSql, [userData], (err, result) => {
            if (err) throw err;
            
            console.log(`Inserted ${result.affectedRows} user records`);

            res.send('Rooms and users created successfully');
          });
        });
      }
    }
  );
});

module.exports = router;