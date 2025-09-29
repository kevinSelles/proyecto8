const House = require("../models/houses");
const Agent = require("../models/agents");
const { deleteFile } = require("../../utils/deleteFile");

const getHouses = async (req, res, next) => {
  try {
    const houses = await House.find().populate("agent");
    return res.status(200).json(houses);
  } catch (error) {
    return res.status(400).json({
      message: "Error al buscar las casas.",
      error: error.message});
  }
};

const getHouseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const house = await House.findById(id).populate("agent");
    return res.status(200).json(house);
  } catch (error) {
    return res.status(400).json({
      message: "Error buscando la casa.",
      error: error.message});
  }
};
const getHousesByLocation = async (req, res, next) => {
  try {
    const { location } = req.params;
    const houses = await House.find({ location }).populate("agent");

     if (!houses.length) {
      return res.status(404).json("Lo siento, pero no encuentro casas en ese lugar.");
    }

    return res.status(200).json(houses);
  } catch (error) {
    return res.status(400).json({
      message: "Error accediendo a las casas de ese lugar.",
      error: error.message});
  }
};

const postHouse = async (req, res, next) => {
  try {
    const newHouse = { ...req.body, agent: []};

    if (req.file) {
      newHouse.img = [req.file.path];
    }

    const agents = await Agent.find();

    for (const agent of agents) {
      if (agent.location === newHouse.location) {
        newHouse.agent.push(agent._id);
      }
    };

    const newHouseWithAgent = new House(newHouse);
    const houseSaved = await newHouseWithAgent.save();

    return res.status(201).json(houseSaved);
  } catch (error) {
    return res.status(400).json({
      message: "Error al publicar la casa, prueba de nuevo o contacta con el administrador.",
      error: error.message});
  }
};

const putHouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedHouse = req.body;

    const house = await House.findById(id);

    if (!house) {
      return res.status(404).json("No encuentro esa casa.");
    }

    if (updatedHouse.title) house.title = updatedHouse.title;
    if (updatedHouse.area) house.area = updatedHouse.area;
    if (updatedHouse.location) house.location = updatedHouse.location;
    if (updatedHouse.description) house.description = updatedHouse.description;
    if (req.file) {
      house.img.push(req.file.path);
    };

    house.agent = [];
    const agents = await Agent.find();
    for (const agent of agents) {
      if (agent.location === house.location) {
        house.agent.push(agent._id);
      }
    }

    const houseSaved = await house.save();
    return res.status(200).json(houseSaved);
  } catch (error) {
    return res.status(400).json({
      message: "Error al modificar los datos de la casa. Prueba de nuevo o contacta con un administrador.",
      error: error.message});
  }
};

const deleteHouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const houseDeleted = await House.findByIdAndDelete(id);

    if (houseDeleted.img && houseDeleted.img.length > 0) {
      for (const image of houseDeleted.img) {
        deleteFile(image);
      }
    }

    return res.status(200).json(houseDeleted);
  } catch (error) {
    return res.status(400).json({
      message: "No ha sido posible eliminar la casa, intentelo de nuevo o contacte con un administrador.",
      error: error.message});
  }
};

module.exports = {
  getHouses,
  getHouseById,
  getHousesByLocation,
  postHouse,
  putHouse,
  deleteHouse
};