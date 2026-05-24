import express from "express";

import {
	aiRecommendation
} from "../controllers/ai.controller.js";

const router = express.Router();

router.post(
	"/recommend",
	aiRecommendation
);

export default router;