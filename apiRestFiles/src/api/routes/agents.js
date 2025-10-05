const upload = require("../../middlewares/file");
const { getAgentsByLocation, getAgentById, getAgents, postAgent, putAgent, deleteAgent } = require("../controllers/agents");

const agentsRouter = require("express").Router();

agentsRouter.get("/location/:location", getAgentsByLocation);
agentsRouter.get("/:id", getAgentById);
agentsRouter.get("/", getAgents);
agentsRouter.post("/", upload.single("img"), postAgent);
agentsRouter.put("/:id", upload.single("img"), putAgent);
agentsRouter.delete("/:id", deleteAgent);

module.exports = agentsRouter;