import modelService from "../services/model-service.js";

const model = (app) => {
  const service = new modelService();

  app.get("/", async (req, res, next) => {
    res.status(200).json({ message: "Welcome to model microservice" });
  });

  app.post("/createModel", async (req, res, next) => {
    try {
      if (req.body) {
        const { data } = await service.createModel(req.body);
        return res.json(data);
      } else {
        return res.status(400).json({ message: "Model not created" });
      }
    } catch (err) {
      next(err);
    }
  });

  app.get("/getModel/:simulationId", async (req, res, next) => {
    try {
      if (req.params.simulationId) {
        const { data } = await service.getModel(req.params.simulationId);
        return res.json(data);
      } else {
        return res.status(400).json({ message: "Unable to find the model" });
      }
    } catch (err) {
      next(err);
    }
  });

  app.post("/deleteModel", async (req, res, next) => {
    try {
      if (req.body) {
        const { data } = await service.softDeleteModel(req.body.simulationId);
        return res.json(data);
      } else {
        return res.status(400).json({ message: "Unable to find the model" });
      }
    } catch (err) {
      next(err);
    }
  });

  app.post("/updateModel", async (req, res, next) => {
    try {
      if (req.body) {
        const { data } = await service.updateModel(req.body);
        return res.json(data);
      } else {
        return res.status(400).json({ message: "Invalid request" });
      }
    } catch (err) {
      next(err);
    }
  });
};

export default model;