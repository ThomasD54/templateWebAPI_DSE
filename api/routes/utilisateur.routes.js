module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
    const checkJwt = require("../middleware/checkJwt");
  
    var router = require("express").Router();
  
    // Routes publiques
    router.post("/login", utilisateur.login);
    router.post("/", utilisateur.create);

    // Routes privées (nécessitent un token JWT)
    router.get("/", checkJwt, utilisateur.findAll);
    router.get("/:id", checkJwt, utilisateur.findOne);

    app.use('/api/utilisateurs', router);
  };
