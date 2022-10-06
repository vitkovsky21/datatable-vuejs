const sql = require("./db.js");

const Datatable = function(datatable) {
    this.id = datatable.id;
    this.date = datatable.date;
    this.name = datatable.name;
    this.quantity = datatable.quantity;
    this.distance = datatable.distance;
}

Datatable.getAll = (name, result) => {
    let query = "SELECT * FROM testtable";
  
    if (name) {
      query += ` WHERE name LIKE '%${name}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("datatables: ", res);
      result(null, res);
    });
  };

  
  module.exports = Datatable;