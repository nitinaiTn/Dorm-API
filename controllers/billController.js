const express = require("express");
const router = express.Router();
const mysql = require('../config/db')

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
      SELECT * FROM Bills
      WHERE user_id = ${userId} AND bill_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
    `;

    mysql.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
      console.log('Succed')
    });
  });

module.exports = router