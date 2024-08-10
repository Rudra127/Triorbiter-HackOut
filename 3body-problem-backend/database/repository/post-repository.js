import { APIError, STATUS_CODES } from "../../utils/app-errors.js";
import { formateData } from "../../utils/index.js";
import postModel from "../models/post.js";

//Dealing with data base operations
export default class postRepository {
  async createPost(postInputs) {
    try {
      console.log("madarchod", postInputs);
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
  async getPost(postId) {
    try {
      console.log("madarchod", postId);
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
  async softDelete(postId) {
    try {
      const post = await postModel.findOneAndUpdate(
        { postId: postId },
        { isVisible: false }
      );
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
  async likePost(postId) {
    try {
      const post = await postModel.findOneAndUpdate(
        { postId: postId },
        { $inc: { likes: 1 } },
        { new: true }
      );
      return post;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to like the post."
      );
    }
  }

  async dislikePost(postId) {
    try {
      const post = await postModel.findOneAndUpdate(
        { postId: postId },
        { $inc: { dislikes: 1 } },
        { new: true }
      );
      return post;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to dislike the post."
      );
    }
  }
  async updateEngagementScore(postId) {
    try {
      const post = await postModel.findOne({ postId });

      if (!post) throw new Error("Post not found");

      const engagementScore =
        post.likes - post.dislikes + post.comments.length * 0.5;
      console.log("engagementScoreaaaaaaaá", engagementScore);
    const finalScore =   await postModel.findOneAndUpdate({ postId }, { engagementScore });

      return finalScore;
    } catch (err) {
      throw new APIError("API Error", "Unable to update engagement score", err);
    }
  }

  async getTopPosts(limit) {
    try {
      const topPosts = await postModel.find()
        .sort({ engagementScore: -1 })
        .limit(limit);
console.log("topPosts", topPosts);
      return formateData({
        message: "Top posts fetched successfully",
        posts: topPosts,
      });
    } catch (err) {
      throw new APIError("API Error", "Unable to fetch top posts", err);
    }
  }

  
}
