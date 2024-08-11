import { modelRepository } from "../database/index.js";
import { formateData } from "../utils/index.js";
import { APIError } from "../utils/app-errors.js";

// All Business logic will be here
export default class modelService {
  constructor() {
    this.repository = new modelRepository();
  }

  async createModel(modelInputs) {
    try {
      const createdModel = await this.repository.createModel(modelInputs);
      return formateData({
        message: "Model created successfully",
        model: createdModel,
      });
    } catch (err) {
      throw new APIError("API Error", "Unable to create the model", err);
    }
  }

  async getModel(simulationId) {
    try {
      const model = await this.repository.getModel(simulationId);
      return formateData({
        message: "Model get successfully",
        model: model,
      });
    } catch (err) {
      throw new APIError("API Error", "Unable to get the model", err);
    }
  }

  async softDeleteModel(simulationId) {
    try {
      const model = await this.repository.softDeleteModel(simulationId);
      return formateData({
        message: "Model removed successfully",
        model: model,
      });
    } catch (err) {
      throw new APIError("API Error", "Unable to remove the model", err);
    }
  }

  async updateModel(modelInputs) {
    try {
      const updatedModel = await this.repository.updateModel(modelInputs);
      return formateData({
        message: "Model updated successfully",
        model: updatedModel,
      });
    } catch (err) {
      throw new APIError("API Error", "Unable to update the model", err);
    }
  }
}