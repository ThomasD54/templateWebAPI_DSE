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
    titre: req.body.titre,
    type_pollution: req.body.type_pollution,
    description: req.body.description,
    date_observation: req.body.date_observation,
    lieu: req.body.lieu,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    photo_url: req.body.photo_url || null
  };

  Pollution.create(pollution)
    .then(data => res.send(data))
    .catch(err => res.status(400).send({ message: err.message }));
};

// Mettre à jour une pollution
exports.update = (req, res) => {
  const id = req.params.id;
  
  Pollution.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pollution was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Pollution with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(400).send({
        message: "Error updating Pollution with id=" + id
      });
    });
};

// Supprimer une pollution
exports.delete = (req, res) => {
  const id = req.params.id;

  Pollution.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pollution was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Pollution with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(400).send({
        message: "Could not delete Pollution with id=" + id
      });
    });
};