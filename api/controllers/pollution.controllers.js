const { v4: uuidv4 } = require ("uuid");

const db = require("../models");
const Pollution = db.pollution;
const Op = db.Sequelize.Op;

// Obtenir toutes les pollutions :
exports.get = (req, res) => {

     Pollution.findAll()
    .then(data => {res.send(data);})
    .catch(err => {
      res.status(400).send({
        message: err.message
      });
    });
}; 

// Obtenir une pollution grâce à l'ID :
exports.findOne = (req, res) => {
    const id = req.params.id;
    Pollution.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Pollution not found"
                });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            });
        });
};

// Création d'une nouvelle pollution
exports.create = (req, res) => {
    const pollution = {
        id: uuidv4(),
        titre: req.body.titre,
        type_pollution: req.body.type_pollution,
        description: req.body.description,
        date_observation: req.body.date_observation,
        lieu: req.body.lieu,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        photo_url: req.body.photo_url
    };

    Pollution.create(pollution)
        .then(data => res.send(data))
        .catch(err => res.status(400).send({ message: err.message }));
    };