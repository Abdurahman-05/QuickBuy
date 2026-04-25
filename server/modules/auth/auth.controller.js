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
      return res.status(400).json({ success: false, message: "User already exists with this email" });
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
      res.status(400).json({ success: false, message: "Invalid user data provided" });
    }
  } catch (error) {
    console.error("Registration Error Details:", error);
    res.status(500).json({ 
      success: false,
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
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error during login" });
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
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("GetMe Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
      return res.status(404).json({ success: false, message: "User not found with this email" });
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

    // Create reset URL (Point to Frontend)
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click the link below to reset your password: \n\n ${resetUrl}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
        <h2 style="color: #333 text-align: center;">QuickBuy Password Reset</h2>
        <p style="color: #555; line-height: 1.6;">You requested a password reset for your QuickBuy account. Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #000; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #555; line-height: 1.6;">If you did not request this reset, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">This link will expire in 10 minutes.</p>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "QuickBuy - Password Reset",
        message,
        html
      });

      res.status(200).json({ success: true, message: "Reset email sent successfully" });
    } catch (error) {
      console.error("[Auth Controller] Email Error:", error.message);
      
      // Rollback database changes
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      
      return res.status(500).json({ 
        success: false, 
        message: "Email delivery failed", 
        error: error.message // Propagate SMTP error for debugging
      });
    }
  } catch (error) {
    console.error("[Auth Controller] Forgot Password Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
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
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
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
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
