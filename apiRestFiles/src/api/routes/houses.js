const upload = require("../../middlewares/file");
const { getHouses, getHouseById, getHousesByLocation, postHouse, putHouse, deleteHouse } = require("../controllers/houses");

const housesRouter = require("express").Router();

housesRouter.get("/location/:location", getHousesByLocation);
housesRouter.get("/:id", getHouseById);
housesRouter.get("/", getHouses);
housesRouter.post("/", upload.array("img"), postHouse);
housesRouter.put("/:id", upload.array("img"), putHouse);
housesRouter.delete("/:id", deleteHouse);

module.exports = housesRouter;