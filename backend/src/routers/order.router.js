import { Router } from "express";
import handler from "express-async-handler";
import auth from "../middleware/auth.mid.js";
import { BAD_REQUEST } from "../constants/httpStatus.js";
import { OrderModel } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";

const router = Router();
router.use(auth);

// Create a new order
router.post(
  "/create",
  handler(async (req, res) => {
    const order = req.body;

    if (!order || !order.items || order.items.length === 0) {
      return res.status(BAD_REQUEST).json({ error: "Cart is empty!" });
    }

    // Delete any existing NEW order for this user
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    // Create and save new order
    const newOrder = new OrderModel({
      ...order,
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    await newOrder.save();
    res.status(201).json(newOrder); // Use HTTP 201 for resource creation
  })
);

export default router;
