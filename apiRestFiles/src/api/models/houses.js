const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    img: [{type: String}],
    area: {type: String},
    location: {type: String},
    description: {type: String, required: true},
    agent: [{type: mongoose.Types.ObjectId, ref: "agents"}],
}, {
  timestamps: true,
  collection: "houses"
});

const House = mongoose.model("houses", houseSchema, "houses");

module.exports = House;