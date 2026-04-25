import Cart from "./cart.model.js";

/**
 * @desc    Get current user's cart
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price images brand stock"
    );

    if (!cart) {
      // Create empty cart if it doesn't exist
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product exists, update quantity
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      // Product doesn't exist, add to items
      cart.items.push({ product: productId, quantity: Number(quantity) });
    }

    const updatedCart = await cart.save();
    
    // Populate before sending response
    const populatedCart = await updatedCart.populate(
      "items.product",
      "name price images brand stock"
    );

    res.status(201).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update cart item quantity
 * @route   PATCH /api/cart/update
 * @access  Private
 */
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = Number(quantity);
        const updatedCart = await cart.save();
        
        const populatedCart = await updatedCart.populate(
          "items.product",
          "name price images brand stock"
        );
        
        res.json(populatedCart);
      } else {
        res.status(404).json({ message: "Product not found in cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:productId
 * @access  Private
 */
export const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );
      
      const updatedCart = await cart.save();
      
      const populatedCart = await updatedCart.populate(
        "items.product",
        "name price images brand stock"
      );
      
      res.json(populatedCart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Clear cart
 * @route   DELETE /api/cart
 * @access  Private
 */
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = [];
      await cart.save();
      res.json({ message: "Cart cleared", items: [] });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
