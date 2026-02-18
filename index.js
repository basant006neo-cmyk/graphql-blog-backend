import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";

import typeDefs from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import { connectDB } from "./config/db.js";
import { getUser } from "./middlerare/auth.js";

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "*",
  },
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const user = await getUser(token);

    return {
      user,
      models: {
        User: (await import("./models/User.js")).default,
        Post: (await import("./models/Post.js")).default,
        Comment: (await import("./models/Comment.js")).default,
      },
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
