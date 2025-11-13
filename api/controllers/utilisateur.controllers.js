const db = require("../models");
const Utilisateurs = db.utilisateurs;
const Op = db.Sequelize.Op;

// Récupérer tous les utilisateurs
exports.findAll = (req, res) => {
  const Utilisateurs = require("../models").utilisateurs;

  Utilisateurs.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


// Obtenir un utilisateur par ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Utilisateurs.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: "Utilisateur not found" });
            }
            res.send(data);
        })
        .catch(err => res.status(400).send({ message: err.message }));
};

// Création d’un utilisateur
exports.create = async (req, res) => {
  console.log("📥 Requête reçue sur /api/utilisateurs");
  console.log("🧾 req.body :", req.body);

  const utilisateur = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    login: req.body.login,
    pass: req.body.pass,
  };

  console.log("✅ Données envoyées à Sequelize :", utilisateur);

  try {
    const data = await Utilisateurs.create(utilisateur);
    console.log("✅ Utilisateur créé :", data);
    res.send(data);
  } catch (err) {
    console.error("❌ Erreur Sequelize :", err);
    res.status(400).send({ message: err.message });
  }
};



// Login
exports.login = (req, res) => {
    const utilisateur = {
        login: req.body.login,
        password: req.body.password
    };

    let pattern = /^[A-Za-z0-9]{1,20}$/;
    if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
        Utilisateurs.findOne({ where: { login: utilisateur.login } })
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({ message: `Cannot find Utilisateur with login=${utilisateur.login}.` });
                }
            })
            .catch(err => res.status(400).send({ message: "Error retrieving Utilisateur with login=" + utilisateur.login }));
    } else {
        res.status(400).send({ message: "Login ou password incorrect" });
    }
};
