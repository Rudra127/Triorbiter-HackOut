import postService from "../services/post-service.js";
const post = (app) => {
  const service = new postService();

  app.get("/", async (req, res, next) => {
    res.status(200).json({ message: "Welcome to user microservice" });
  });

  app.post("/createPost", async (req, res, next) => {
    try {
      if (req.body) {
        const { data } = await service.createPost(req.body);
        return res.json(data);
      } else {
        return res.status(400).json({ message: "Post not cerated" });
      }
    } catch (err) {
      next(err);
    }
  });
  app.get("/getPost/:postId", async (req, res, next) => {
    try {
      if (req.params.postId) {
        const { data } = await service.getPost(req.params.postId);
        return res.json(data);
      } else {
        return res.status(400).json({ message: "unable to find the post" });
      }
    } catch (err) {
      next(err);
    }
  });
  app.post("/deletePost", async (req, res, next) => {
    try {
      if (req.body) {
        const { data } = await service.softDelete(req.body.postId);
        return res.json(data);
      } else {
        return res.status(400).json({ message: "unable to find the user" });
      }
    } catch (err) {
      next(err);
    }
  });
  app.post("/likePost", async (req, res, next) => {
    try {
      if (req.body && req.body.postId) {
        const { data } = await service.likePost(req.body.postId);
        return res.json(data);
      } else {
        return res.status(400).json({ message: "Invalid request" });
      }
    } catch (err) {
      next(err);
    }
  });

  app.post("/dislikePost", async (req, res, next) => {
    try {
      if (req.body && req.body.postId) {
        const { data } = await service.dislikePost(req.body.postId);
        return res.json(data);
      } else {
        return res.status(400).json({ message: "Invalid request" });
      }
    } catch (err) {
      next(err);
    }
  });
  app.post("/updateEngagementScore", async (req, res, next) => {
    try {
      if (req.body && req.body.postId) {
        const { data } = await service.updateEngagementScore(req.body.postId);
        return res.json(data);
      } else {
        return res.status(400).json({ message: "Invalid request" });
      }
    } catch (err) {
      next(err);
    }
  });
    app.post("/getTopPost", async (req, res, next) => {
      try {
        if (req.body) {
          const limit = req.body.limit || 10; 
          const { data } = await service.getTop10(limit);
          return res.json(data);
        } else {
          return res.status(400).json({ message: "Invalid request" });
        }
      } catch (err) {
        next(err);
      }
    });
};
export default post;
