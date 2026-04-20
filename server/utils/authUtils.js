import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * Generate a JWT token for a given user ID
 * @param {string} userId - The ID of the authenticated user
 * @returns {string} The signed JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 30 days
  });
};

/**
 * Hash a plain text password using bcryptjs
 * @param {string} password - The plain text password to hash
 * @returns {Promise<string>} The hashed password
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
