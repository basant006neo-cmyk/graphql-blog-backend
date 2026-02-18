import Post from "../models/Post.js";

export default {
  Query: {
    posts: async (_, { page = 1, limit = 5 }) => {
      return Post.find();
    },
    post: async (_, { id }) => {
      return Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (_, { title, content }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      return Post.create({
        title,
        content,
        author: user._id,
      });
    },
  },
  Post: {
    author: async (post, _, { models }) => {
      return models.User.findById(post.author);
    },
  },
};
