import User from "../user/user.model.js";
import { generateToken } from "../../utils/authUtils.js";
import crypto from "crypto";
import { sendEmail } from "../../config/email.js";

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    console.log("Registration attempt received");
    console.log("Headers:", req.headers["content-type"]);
    console.log("Body:", req.body);
    
    const { firstName, lastName, email, password, phone, profileImage } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Create user in the database
    // Note: The password will be automatically hashed by our pre-save hook in the User model
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      profileImage,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || null,
        profileImage: user.profileImage || null,
        role: user.role,
        address: {
          street: user.address?.street || null,
          city: user.address?.city || null,
          state: user.address?.state || null,
          country: user.address?.country || null,
          zipCode: user.address?.zipCode || null,
        },
        token: generateToken(user._id), // Send JWT to the client
      });
    } else {
      res.status(400).json({ message: "Invalid user data provided" });
    }
  } catch (error) {
    console.error("Registration Error Details:", error);
    res.status(500).json({ 
      message: "Server Error during registration", 
      error: error.message,
      receivedDetails: {
        contentType: req.headers["content-type"],
        body: req.body
      },
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
};

/**
 * @desc    Authenticate user & get token (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists AND password matches using our models helper method
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || null,
        profileImage: user.profileImage || null,
        role: user.role,
        address: {
          street: user.address?.street || null,
          city: user.address?.city || null,
          state: user.address?.state || null,
          country: user.address?.country || null,
          zipCode: user.address?.zipCode || null,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server Error during login" });
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || null,
        profileImage: user.profileImage || null,
        role: user.role,
        address: {
          street: user.address?.street || null,
          city: user.address?.city || null,
          state: user.address?.state || null,
          country: user.address?.country || null,
          zipCode: user.address?.zipCode || null,
        },
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } else {
// ... (middle)
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("GetMe Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Forgot Password - Send reset email
 * @route   POST /api/auth/forgotpassword
 * @access  Public
 */
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    // Get reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expire (10 minutes)
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Token",
        message,
      });

      res.status(200).json({ success: true, data: "Email sent" });
    } catch (error) {
      console.error("Email Error:", error.message);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Reset Password
 * @route   PUT /api/auth/resetpassword/:resettoken
 * @access  Public
 */
export const resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || null,
      profileImage: user.profileImage || null,
      role: user.role,
      address: {
        street: user.address?.street || null,
        city: user.address?.city || null,
        state: user.address?.state || null,
        country: user.address?.country || null,
        zipCode: user.address?.zipCode || null,
      },
      token: generateToken(user._id),
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
