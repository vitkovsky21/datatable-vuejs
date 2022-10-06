module.exports = app => {
    const datatables = require("../controllers/data.controller.js");
  
    var router = require("express").Router();
  
   console.log(1)
    router.get("/", datatables.findAll);
    console.log(3)
  
    app.use('/api/datatables', router);
  };