const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
});

const Card = mongoose.model('card', cardSchema);

module.exports = Card;
