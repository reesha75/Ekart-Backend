import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

// Get Cart
export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart) {
            return res.json({ success: true, cart: [] })
        }
        res.status(200).json({ success: true, cart })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

// Add to Cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        let cart = await Cart.findOne({ userId })

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity: 1, price: product.productPrice }],
                totalPrice: product.productPrice
            })
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.productId.toString() === productId
            )

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1
            } else {
                cart.items.push({
                    productId,
                    quantity: 1,
                    price: product.productPrice,
                })
            }
        }

        cart.totalPrice = cart.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        )

        await cart.save()

        const populatedCart = await Cart.findById(cart._id).populate("items.productId")

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart: populatedCart
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

//update cart
export const updateQuantity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, type } = req.body;

        // 1. User ki cart dhoondo
        let cart = await Cart.findOne({ userId })
        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" })

        // 2. Cart mein woh item dhoondo jise update karna hai
        const item = cart.items.find(item => item.productId.toString() === productId)
        if (!item) return res.status(404).json({ success: false, message: "Item not found" })

        // 3. Type ke mutabiq quantity badhao ya ghatao
        if (type === "increase") item.quantity += 1
        if (type === "decrease" && item.quantity > 1) item.quantity -= 1

        // 4. Cart ka total price dobara calculate karo
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)

        // 5. Database mein save karo
        await cart.save()
        
        // 6. Populate karke response bhejo
        cart = await cart.populate("items.productId")

        res.status(200).json({ success: true, cart })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
  //remove items from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        // 1. User ki cart dhoondo
        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

        // 2. Filter ka use karke us item ko hatao jiska ID match karta hai
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        // 3. Cart ka total price dobara calculate karo
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        // 4. Save karo
        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
