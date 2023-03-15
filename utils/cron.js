const db = require('../config/db')

export default function handler(req, res) {
    res.status(200).end('Hello Cron!');
    // Query the database
    console.log('Running cron job...');
    db.query('SELECT p.number_of_floors, p.number_of_rooms, p.property_id, u.user_id, r.room_id FROM Properties p INNER JOIN Rooms r ON p.property_id = r.property_id INNER JOIN Users u ON r.room_id = u.room_id', function (error, results, fields) {
        if (error) throw error;
        if (results.length === 0) {
            console.log(`Property not found`);
        } else {
            // Collect all data to be inserted in an array
            const data = [];
            for (let i = 0; i < results.length; i++) {
                data.push([results[i].user_id, results[i].property_id, results[i].room_id, new Date()]);
            }

            // Construct the SQL query with placeholders for the data
            const roomSql = `INSERT INTO Utility_Consumption (user_id, property_id, room_id, consumption_date) VALUES ?`;

            // Execute the batch insert query
            db.query(roomSql, [data], (err, result) => {
                if (err) throw err;
                console.log(`Inserted ${result.affectedRows} rows.`);
            });
        }
    });
}