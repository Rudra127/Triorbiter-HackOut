import { postRepository } from "../database/index.js";
import {
  formateData,

} from "../utils/index.js";
import { APIError } from "../utils/app-errors.js";

// All Business logic will be here
export default class postService {
  constructor() {
    this.repository = new postRepository();
  }
  async createPost(postInputs) {
console.log(postInputs, "fuck");
    try {
      // if (!postInputs) {
      //   throw new APIError("Validation Error", "Missing required fields");
      // }

      const createdPost = await this.repository.createPost(postInputs);
      return formateData({
        message: "Post created successfully",
        post: createdPost,
      });
    } catch (err) {
      throw new APIError("API Error", "Unable to create the post", err);
    }
  }

  async getPost(postId) {
    try {
      // if (!postId) {
      //   throw new APIError("Validation Error", "Missing required fields");
      // }

      const posts = await this.repository.getPost(postId);

      return formateData({
        message: "Post get successfully",
        post: posts,
      });
    } catch (err) {
      throw new APIError("API Error", "Unable to get the post", err);
    }
  }
  async softDelete(postId) {
    try {
      if (!postId) {
        throw new APIError("Validation Error", "Missing required fields");
      }

      const post = await this.repository.softDelete(postId);

      return formateData({
        message: "Post removed successfully",
        post: post,
      });
    } catch (err) {
      throw new APIError("API Error", "Unable to remove the post", err);
    }
  }




}
