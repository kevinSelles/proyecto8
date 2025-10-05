const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    img: {type: String},
    name: {type: String, required: true},
    location: {type: String, required: true},
    phone: {type: Number, required: true},
    email: {type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/}
}, {
  timestamps: true,
  collection: "agents"
});

const Agent = mongoose.model("agents", agentSchema, "agents");

module.exports = Agent;