import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const getUser = async (token) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(`decoded`,decoded);

    return User.findById(decoded.id);
  } catch {
    return null;
  }
};
