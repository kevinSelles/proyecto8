require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("../../config/db");
const House = require("../../api/models/houses");
const Agent = require("../../api/models/agents");

const houses = [
  {
    title: "Bonita casa en la costa onubense",
    area: "155m²",
    img: [],
    location: "Huelva",
    description: "Casa totalmente amueblada, lista para entrar a vivir",
    agent: []
  },
  {
    title: "Excelente casa en la costa gaditana",
    img: [],
    area: "85m²",
    location: "Cádiz",
    description: "Casa a pie de playa. Es como vivir de vacaciones todo el año",
    agent: []
  },
  {
    title: "Preciosa casa en la costa malageña",
    img: [],
    area: "100m²",
    location: "Málaga",
    description: "Se vende sin amueblar y necesita algunas reformas",
    agent: []
  },
  {
    title: "Bonita casa en la sierra granadina",
    img: [],
    area: "105m²",
    location: "Granada",
    description: "Vivirás junto a la hermosa Sierra Nevada y a solo 50km de la playa ",
    agent: []
  },
  {
    title: "Oportunidad en la costa almeriense",
    img: [],
    area: "90m²",
    location: "Almería",
    description: "Vivirás junto a algunas playas de ensueño",
    agent: []
  }
];

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
  }
};

seedHouses();