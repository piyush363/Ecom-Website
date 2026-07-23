const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");

const addOrderItems = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId, status } = req.body;

    // 🔴 Fallback check to prevent "Cannot read properties of null (reading '_id')"
    const userId = req.user ? req.user._id : null;

    if (!userId) {
      return res.status(401).json({ message: "User authentication failed. Please logout and login again." });
    }

    if (items && items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    } else {
      const order = new Order({
        userId: userId, // 👈 req.user._id ki jagah safe userId use karein
        items,
        totalAmount,
        address,
        paymentId,
        status: status || "Paid",
      });
      
      
      const createdOrder = await order.save();

      // Safe calculation for total amount
      const formattedAmount = totalAmount ? Number(totalAmount).toFixed(2) : "0.00";

      // Send Order Confirmation Email
      const message = `
        <h2>Order Confirmation</h2>
        <p>Hello ${req.user.name || "Customer"},</p>
        <p>Your order has been successfully placed! Order ID: <strong>${createdOrder._id}</strong></p>
        <p>Total Amount Paid: ₹${formattedAmount}</p>
        <p>It will be shipped to: ${address?.street || ""}, ${address?.city || ""}</p>
        <p>Thank you for shopping with ShopNest!</p>
      `;

      try {
        await sendEmail({
          email: req.user.email,
          subject: "ShopNest - Order Confirmation",
          message,
        });
      } catch (emailErr) {
        console.error("Email sending failed:", emailErr.message);
        // Email fail hone par bhi order save success return karein
      }

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    console.error("Error in addOrderItems:", error);
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("userId", "id name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("ORDER SAVE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrderItems, getMyOrders, getOrders, updateOrderStatus };