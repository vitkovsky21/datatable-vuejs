const Datatable = require("../models/data.model.js");

exports.findAll = (req, res) => {
    console.log(req)
    const name = req.query.name;
    console.log("find")
  
    Datatable.getAll(name, (err, data) => {
      console.log(123)
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred."
        });
      else res.send(data);
    });
};