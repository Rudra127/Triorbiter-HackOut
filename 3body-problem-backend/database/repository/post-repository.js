import { APIError, STATUS_CODES } from "../../utils/app-errors.js";
import postModel from "../models/post.js";

//Dealing with data base operations
export default class postRepository {
  async createPost(postInputs) {
    try {
      console.log("madarchod",postInputs);
      const post = await postModel.create(postInputs);

      return post;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to create the post."
      );
    }
  }
  async getPost( postId ) {
    try {
      console.log("madarchod",postId);
      const post = await postModel.findOne({ postId: postId });
      return post;
    } catch (err) {
      console.log(err);
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find user"
      );
    }
  }
  async softDelete( postId ) {
    try {
      const post = await postModel.findOneAndUpdate({ postId: postId }, {isVisible: false});
      return post;
    } catch (err) {
      console.log(err);
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find user"
      );
    }
  }
}
