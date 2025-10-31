module.exports = app => {
    const catalogue = require("../controllers/pollution.controllers.js");
  
    var router = require("express").Router();
  

   
    router.get("/", pollution.get);
  
    app.use('/api/pollution', router);
  };
