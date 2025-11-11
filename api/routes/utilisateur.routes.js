module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
  
    var router = require("express").Router();
  

    // login utilisateur
    router.post("/login", utilisateur.login);
    
    // Création d'un utilisateur
    router.post("/", utilisateur.create);

    // Récupérer tous les utilisateurs
    router.get("/", utilisateur.findAll);

    // Récupérer un utilisateur par ID
    router.get("/:id", utilisateur.findOne);

    app.use('/api/utilisateurs', router);
  };
