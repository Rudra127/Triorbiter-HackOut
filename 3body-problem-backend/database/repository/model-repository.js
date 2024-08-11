import { APIError, STATUS_CODES } from "../../utils/app-errors.js";
import { formateData } from "../../utils/index.js";
import threeBodyProblemModel from "../models/threeBodyProblemModel.js";
//Dealing with data base operations
export default class modelRepository {
  async createModel(modelInput) {
    try {
      const model = await threeBodyProblemModel.create(modelInput);

      return model;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to create the Model."
      );
    }
  }
  async getModel(simulationId) {
    try {
      const post = await threeBodyProblemModel.findOne({ simulationId: simulationId });
      return post;
    } catch (err) {
      console.log(err);
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Model"
      );
    }
  }
  async softDeleteModel(simulationId) {
    try {
      const Model = await threeBodyProblemModel.findOneAndUpdate(
        { simulationId: simulationId },
        { isDeleted: true }
      );
      return Model;
    } catch (err) {
      console.log(err);
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find model"
      );
    }
  }
  async updateModel({ modelInput }) {
    try {
      const { simulationId } = modelInput;
      const model = await threeBodyProblemModel.findOne({ simulationId });
  
      if (!model) throw new Error("Model not found");
  
      const updatedModel = await threeBodyProblemModel.findOneAndUpdate({ simulationId }, modelInput, { new: true });
  
      return updatedModel;
    } catch (err) {
      throw new APIError("API Error", "Unable to update model", err);
    }
  }
}
