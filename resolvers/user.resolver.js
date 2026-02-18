import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export default {
  Query: {
    me: (_, __, { user }) => user,
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashed,
      });
      console.log(user);
      

      return {
        token: generateToken(user),
        user,
      };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");
      return {
        token: generateToken(user),
        user,
      };
    },
  },
};
