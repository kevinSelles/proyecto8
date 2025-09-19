const upload = require("../../middlewares/file");
const { getAgentsByLocation, getAgentById, getAgents, postAgent, putAgent, deleteAgent } = require("../controllers/agents");

const AgentsRouter = require("express").Router();

AgentsRouter.get("/location/:location", getAgentsByLocation);
AgentsRouter.get("/:id", getAgentById);
AgentsRouter.get("/", getAgents);
AgentsRouter.post("/", upload.single("img"), postAgent);
AgentsRouter.put("/:id", upload.single("img"), putAgent);
AgentsRouter.delete("/:id", deleteAgent);

module.exports = AgentsRouter;