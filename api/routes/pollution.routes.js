module.exports = app => {
    const pollution = require("../controllers/pollution.controllers.js");
    const checkJwt = require("../middleware/checkJwt");
  
    const router = require("express").Router();
  
    // Routes publiques (lecture seule)
    router.get("/", pollution.get);
    router.get("/:id", pollution.findOne);
    
    // Routes privées (nécessitent un token JWT)
    router.post("/", checkJwt, pollution.create);
    router.put("/:id", checkJwt, pollution.update);
    router.delete("/:id", checkJwt, pollution.delete);
  
    app.use('/api/pollutions', router);
  };