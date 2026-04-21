import jwt from "jsonwebtoken";
import User from "../modules/user/user.model.js";

/**
 * Middleware to verify the JWT token from the headers 
 * and attach the associated user to the req object.
 */
export const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token (e.g. "Bearer {token}")
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID and attach it to req.user (excluding the password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token was found at all
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

/**
 * Middleware to restrict route access strictly to users with the 'ADMIN' role.
 * Depends on the 'protect' middleware running first.
 */
export const adminCheck = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
};
