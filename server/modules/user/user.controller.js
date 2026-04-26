import User from "./user.model.js";

const getUploadedImageUrl = (file) => {
  if (!file) return null;

  if (typeof file.path === "string" && file.path.trim()) return file.path;
  if (typeof file.secure_url === "string" && file.secure_url.trim()) return file.secure_url;
  if (typeof file.url === "string" && file.url.trim()) return file.url;

  if (file.path && typeof file.path === "object") {
    if (typeof file.path.secure_url === "string" && file.path.secure_url.trim()) {
      return file.path.secure_url;
    }
    if (typeof file.path.url === "string" && file.path.url.trim()) {
      return file.path.url;
    }
  }

  return null;
};

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
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
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
      
      if (req.file) {
        const uploadedImageUrl = getUploadedImageUrl(req.file);
        if (!uploadedImageUrl) {
          return res.status(400).json({ message: "Profile image upload failed. Please try another image." });
        }
        user.profileImage = uploadedImageUrl;
      } else if (req.body.profileImage !== undefined) {
        if (typeof req.body.profileImage === "string") {
          user.profileImage = req.body.profileImage;
        } else if (req.body.profileImage !== null) {
          return res.status(400).json({ message: "Invalid profile image format." });
        }
      }
      
      if (req.body.password) {
        user.password = req.body.password;
      }

      if (req.body.address) {
        const addressData = typeof req.body.address === 'string' 
          ? JSON.parse(req.body.address) 
          : req.body.address;

        user.address = {
          street: addressData.street || user.address?.street || null,
          city: addressData.city || user.address?.city || null,
          state: addressData.state || user.address?.state || null,
          country: addressData.country || user.address?.country || null,
          zipCode: addressData.zipCode || user.address?.zipCode || null,
        };
      }

      const updatedUser = await user.save();
      
      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone || null,
        profileImage: updatedUser.profileImage || null,
        role: updatedUser.role,
        address: {
          street: updatedUser.address?.street || null,
          city: updatedUser.address?.city || null,
          state: updatedUser.address?.state || null,
          country: updatedUser.address?.country || null,
          zipCode: updatedUser.address?.zipCode || null,
        },
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    
    const formattedUsers = users.map(user => ({
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
    }));

    res.json(formattedUsers);
  } catch (error) {
    console.error("Get Users Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
