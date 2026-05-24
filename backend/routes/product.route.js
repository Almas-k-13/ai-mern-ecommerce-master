import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getFeaturedProducts,
	getProductsByCategory,
	getRecommendedProducts,
	toggleFeaturedProduct,
	searchProducts,
	addReview,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.get("/search", searchProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.post(
	"/:id/review",
	protectRoute,
	addReview
);


export default router;
