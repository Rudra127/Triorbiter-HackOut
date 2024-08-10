import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const commentSchema = new mongoose.Schema(
  {
    commentId: {
      type: String,
      default: uuid,
    },
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    disLikes:{ 
      
      type: Number,
      default: 0,

    }
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      require: true,
      unique: true,
      default: uuid,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    postDesc: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    media: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [commentSchema], 
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isVisible: {
      type: Boolean,
      default: true, 
    },
    likes:{
      type: Number,
      default: 0,
    },
    dislikes:{
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
