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

  async likePost(postId) {
    try {
      if (!postId) {
        throw new APIError("Validation Error", "Missing required fields");
      }

      const post = await this.repository.likePost(postId);
      return formateData({
        message: "Post liked successfully",
        post: post,
      });
    } catch (err) {
      throw new APIError("API Error", "Unable to like the post", err);
    }
  }

  async dislikePost(postId) {
    try {
      if (!postId) {
        throw new APIError("Validation Error", "Missing required fields");
      }

      const post = await this.repository.dislikePost(postId);
      return formateData({
        message: "Post disliked successfully",
        post: post,
      });
    } catch (err) {
      throw new APIError("API Error", "Unable to dislike the post", err);
    }
  }

  async updateEngagementScore(postId) {
    try {
      console.log("Updating engagement score for postId:", postId);
      if (!postId) {
        throw new APIError("Validation Error", "Missing required fields");
      }
  
      const post = await this.repository.updateEngagementScore(postId);
      console.log("Updated engagement score:", post);
      return formateData({
        message: "Post engagement score updated successfully",
        post: post,
      });
    } catch (err) {
      console.error("Error in updateEngagementScore service:", err);
      throw new APIError("API Error", "Unable to update engagement score of the post", err);
    }
  }

  async getTop10(limit) {
    try {
      console.log("limit", limit);
      const top = await this.repository.getTopPosts(limit);
      console.log("got this fucking thing:", top);
      return formateData({
        message: "top post's updated successfully",
        top: top,
      });
    } catch (err) {
      console.error("Error in top post service:", err);
      throw new APIError("API Error", "Unable to get score of the post", err);
    }
  }
  

}
