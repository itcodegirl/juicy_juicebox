const express = require("express");
const postsRouter = express.Router();


postsRouter.get("/", async (req, res, next) => {
  try {
    const allPosts = await getAllPosts();

    const posts = allPosts.filter((post) => {
      return (
        (post.active && post.author.active !== false) ||
        (req.user && req.user.active && post.author.id === req.user.id)
      );
    });

    res.send({
      posts: [...posts],
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
module.exports = postsRouter;
