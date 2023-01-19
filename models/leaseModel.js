const mysql = require('../config/db')

let Lease = function (lease) {
  this.lease_id = lease.lease_id;
  this.user_id = lease.user_id;
  this.property_id = lease.property_id;
  this.room_id = lease.room_id;
  this.start_date = lease.start_date;
  this.end_date = lease.end_date;
  this.rent_amount = lease.rent_amount;
  this.deposit_amount = lease.deposit_amount;
  this.number_of_tenants = lease.number_of_tenants;
};

Lease.findAll = function (result) {
  mysql.query("Select * from Leases", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Leases : ", res);
      result(null, res);
    }
  });
};

Lease.findByUserId = function (user_id, result) {
  mysql.query("Select * from Leases where user_id = ? ", user_id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Lease.create = function (newLease, result) {
  mysql.query("INSERT INTO Leases set ?", newLease, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Lease.delete = function (lease_id, result) {
  mysql.query("DELETE FROM Leases WHERE lease_id = ?", [lease_id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Lease.update = function (lease_id, lease, result) {
  mysql.query(
    "UPDATE Leases SET user_id=?,property_id=?,room_id=?,start_date=?,end_date=?,rent_amount=?,deposit_amount=?,number_of_tenants=? WHERE lease_id = ?",
    [lease.user_id, lease.property_id, lease.room_id, lease.start_date, lease.end_date, lease.rent_amount, lease.deposit_amount, lease.number_of_tenants, lease_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
};

module.exports = Lease;