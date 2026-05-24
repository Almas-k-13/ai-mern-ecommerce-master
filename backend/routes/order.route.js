import express from "express";

import {
    createOrder,
    getAllOrders,
    getMyOrders,
    updateOrderStatus,
} from "../controllers/order.controller.js";

import {
    protectRoute,
    adminRoute,
} from "../middleware/auth.middleware.js";

const router = express.Router();



router.get(
    "/",
    protectRoute,
    adminRoute,
    getAllOrders
);

router.post("/", protectRoute, createOrder);


router.put(
    "/:id",
    protectRoute,
    adminRoute,
    updateOrderStatus
);

router.get("/my-orders", protectRoute, getMyOrders);


export default router;