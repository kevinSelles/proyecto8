const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    img: {type: String},
    name: {type: String, required: true},
    location: {type: String, required: true},
    phone: {type: Number, require: true},
    email: {type: String, require: true}
}, {
  timestamps: true,
  collection: "agents"
});

const Agent = mongoose.model("agents", agentSchema, "agents");

module.exports = Agent;