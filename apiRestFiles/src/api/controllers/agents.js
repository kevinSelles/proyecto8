const { deleteFile } = require("../../utils/deleteFile");
const Agent = require("../models/agents");
const House = require("../models/houses");

const getAgents = async (req, res, next) => {
  try {
    const agents = await Agent.find();
    return res.status(200).json(agents);
  } catch (error) {
    return res.status(500).json({
      message: "Error encontrando agentes inmobiliarios, por favor, inténtelo de nuevo.",
      error: error.message});
  }
};

const getAgentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findById(id);

    if (!agent) {
      return res.status(404).json("Agente no encontrado");
    };

    return res.status(200).json(agent);
  } catch (error) {
    return res.status(500).json({
      message: "Error buscando a su agente inmobiliario, inténtelo de nuevo.",
      error: error.message});
  }
};

const getAgentsByLocation = async (req, res, next) => {
  try {
    const { location } = req.params;
    const agents = await Agent.find({ location });

    if (!agents.length) {
      return res.status(404).json({ message: "No hay agentes inmobiliarios en esa ubicación." });
    };

    return res.status(200).json(agents);
  } catch (error) {
    return res.status(500).json({
      message: "Error al buscar agentes inmobiliarios en esta zona. Inténtelo de nuevo.",
      error: error.message});
  }
};
const postAgent = async (req, res, next) => {
  try {

    if (!req.body.name || !req.body.email || !req.body.location) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    };

    const newAgent = new Agent(req.body);

    if (req.file) {
      newAgent.img = req.file.path;
    };

    const agentSaved = await newAgent.save();

    const houses = await House.find();

    for (const house of houses) {
      if (house.location === agentSaved.location) {
        house.agent.push(agentSaved._id);
        await house.save();
      }
    };

    return res.status(201).json(agentSaved);
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear perfil del agente inmobiliario. Inténtelo más tarde.",
      error: error.message});
  }
};

const putAgent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const agent = await Agent.findById(id);
    if (!agent) {
      return res.status(404).json({ message: "Agente no encontrado." });
    };

    const updatedAgent = req.body;

      if (req.file) {
        const oldAgent = await Agent.findById(id);
        if(oldAgent && oldAgent.img) {
          deleteFile(oldAgent.img);
      }
      updatedAgent.img = req.file.path;
    }

    const agentUpdated = await Agent.findByIdAndUpdate(id, updatedAgent, { new: true });

    const houses = await House.find();

    for (const house of houses) {

      if (house.location !== agentUpdated.location) {
        house.agent = house.agent.filter(agent => !agent.equals(agentUpdated._id));
        await house.save();
      }

      if (house.location === agentUpdated.location) {
        if (!house.agent.includes(agentUpdated._id)) {
          house.agent.push(agentUpdated._id);
          await house.save();
        }
      }
    };

    return res.status(200).json(agentUpdated);
  } catch (error) {
    return res.status(500).json({
      message: "Error al modificar los datos del agente. Inténtelo de nuevo.",
      error: error.message});
  }
};

const deleteAgent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const agentDeleted = await Agent.findByIdAndDelete(id);

    if (!agentDeleted) {
      return res.status(404).json({ message: "No se encontró el agente a eliminar." });
    };

    deleteFile(agentDeleted.img);

    const houses = await House.find();

    for (const house of houses) {
      house.agent = house.agent.filter(agent => !agent.equals(id));
      await house.save();
    }

    return res.status(200).json(agentDeleted);
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el perfil del agente inmobiliario. Inténtelo de nuevo",
      error: error.message});
  }
};

module.exports = {
  getAgents,
  getAgentById,
  getAgentsByLocation,
  postAgent,
  putAgent,
  deleteAgent
};