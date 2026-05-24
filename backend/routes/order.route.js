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
router.get("/my-orders", protectRoute, getMyOrders);


router.put(
    "/:id",
    protectRoute,
    adminRoute,
    updateOrderStatus
);



export default router;