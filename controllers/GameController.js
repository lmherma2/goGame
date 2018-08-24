const db = require("../models");

// Defining methods for the GamesController
module.exports = {
  findAll: function(req, res) {
    console.log('WE NEED TO SEE THIS!!!!!');
    
    console.log("Find all");

    db.Game
      .find()
      .then(console.log(res.data))
      .then(dbModel => console.log(res.json(dbModel)))
     // .then(dbModel => console.log(res.json(dbModel)))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Game
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
      console.log("Post route hit")
    db.Game
      .create(req.body)
      .then(console.log("CALLED"))
      //.then(dbModel => res.json(dbModel))
      //.catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Game
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
