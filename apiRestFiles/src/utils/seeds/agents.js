require("dotenv").config();
const { connectDB } = require("../../config/db");
const Agent = require("../../api/models/agents");
const agents = require("./data/agents.json");

const seedAgents = async () => {
  try {
    await connectDB();

    await Agent.deleteMany();
    console.log("Perfiles de gentes inmobiliarios borrados");

    await Agent.insertMany(agents);
    console.log("Perfiles de agentes inmobiliarios creados");
  } catch (error) {
    console.error("Error al cargar la semilla", error);
  }
};

seedAgents();