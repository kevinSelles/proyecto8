require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("../../config/db");
const House = require("../../api/models/houses");
const Agent = require("../../api/models/agents");
const houses = require("./data/houses.json");

const seedHouses = async () => {
  try {
    await connectDB();

    await House.deleteMany();
    console.log("Casas borradas");

    const agents = await Agent.find();

    for (const house of houses) {
      house.agent = [];
      for(const agent of agents) {
          if(house.location === agent.location) {
            house.agent.push(agent._id);
          } 
      }
    };

    await House.insertMany(houses);

    console.log("Casas creadas y agentes asignados");
  } catch (error) {
    console.error("Error al cargar la semilla", error);
  } finally {
      await mongoose.disconnect();
      console.log("Conexión a la BBDD cerrada");
    }
};

seedHouses();