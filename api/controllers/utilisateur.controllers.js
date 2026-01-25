const db = require("../models");
const Utilisateurs = db.utilisateurs;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config");

// Récupérer tous les utilisateurs
exports.findAll = (req, res) => {
  const Utilisateurs = require("../models").utilisateurs;

  Utilisateurs.findAll({
    attributes: { exclude: ['pass'] } // Ne pas renvoyer le mot de passe
  })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


// Obtenir un utilisateur par ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Utilisateurs.findByPk(id, {
      attributes: { exclude: ['pass'] } // Ne pas renvoyer le mot de passe
    })
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



// Login avec génération de JWT
exports.login = async (req, res) => {
    const { login, pass } = req.body;

    // Validation des entrées
    let pattern = /^[A-Za-z0-9]{1,20}$/;
    if (!pattern.test(login) || !pattern.test(pass)) {
        return res.status(400).send({ message: "Login ou mot de passe incorrect" });
    }

    try {
        // Recherche de l'utilisateur
        const utilisateur = await Utilisateurs.findOne({ where: { login: login } });
        
        if (!utilisateur) {
            return res.status(404).send({ message: "Utilisateur non trouvé" });
        }

        // Vérification du mot de passe (simple comparaison)
        if (utilisateur.pass !== pass) {
            return res.status(401).send({ message: "Mot de passe incorrect" });
        }

        // Génération du JWT
        const token = jwt.sign(
            { 
                id: utilisateur.id,
                login: utilisateur.login,
                nom: utilisateur.nom,
                prenom: utilisateur.prenom
            },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '24h' } // Le token expire après 24h
        );

        // Réponse avec utilisateur ET token (format attendu par le frontend)
        res.send({
            utilisateur: {
                id: utilisateur.id,
                nom: utilisateur.nom,
                prenom: utilisateur.prenom,
                login: utilisateur.login
            },
            token: token
        });

    } catch (err) {
        res.status(500).send({ message: "Erreur lors de la connexion: " + err.message });
    }
};
