module.exports = {
    get: function(con, callback) {
      con.query("SELECT * FROM Users", callback)
    },
  
    getById: function(con, id, callback) {
      con.query(`SELECT * FROM Users WHERE user_id = ${id}`, callback)
    },
  
    create: function(con, data, callback) {
      con.query(
        `INSERT INTO Users SET 
        name = '${data.name}', 
        password = '${data.password}'`,
        callback
      )
    },
  
    update: function(con, data, id, callback) {
      con.query(
        `UPDATE Users SET 
        name = '${data.name}', 
        password = '${data.password}' 
        WHERE user_id = ${id}`,
        callback
      )
    },
  
    destroy: function(con, id, callback) {
      con.query(`DELETE FROM Users WHERE user_id = ${id}`, callback)
    }
  }