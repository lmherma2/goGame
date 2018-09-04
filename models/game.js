const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  Title: {type: String, required: true},
  Game: { type: Array, required: true }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;