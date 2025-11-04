module.exports = app => {
    const pollution = require("../controllers/pollution.controllers.js");
  
    const router = require("express").Router();
  
    
    router.get("/", pollution.get);
    router.get("/:id", pollution.findOne);
    router.post("/", pollution.create);
  

    app.use('/api/pollution', router);
  };
