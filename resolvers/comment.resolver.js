import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export default {
  Mutation: {
    addComment: async (_, { postId, text }, { user }) => {
      if (!user) throw new Error("Unauthorized");

      const post = await Post.findById(postId);

      if (!post) {
        throw new Error("Post not found"); // 🔥 important
      }

      return Comment.create({
        text,
        post: postId,
        user: user._id,
      });
    },
  },
  Comment: {
    user: (comment, _, { models }) => {
      return models.User.findById(comment.user).lean().exec(); // new query each time ✅
    },
    post: async (comment, _, { models }) => {
      const post = await models.Post.findById(comment.post).lean().exec();

      console.log("Comment.post =>", comment.post);
      console.log("Found post =>", post);

      return post;
    },
  },
};
