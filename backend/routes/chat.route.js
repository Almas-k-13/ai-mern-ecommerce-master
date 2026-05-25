import express from "express";

import Chat from "../models/chat.model.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
	"/",
	protectRoute,
	async (req, res) => {

		try {

			const messages = await Chat.find()
				.populate(
					"sender",
					"name email"
				)
				.sort({
					createdAt: 1,
				});

			res.status(200).json(
				messages
			);

		} catch (error) {

			console.log(
				"GET CHAT ERROR:",
				error
			);

			res.status(500).json({
				message: "Server Error",
			});
		}
	}
);

router.post(
	"/",
	protectRoute,
	async (req, res) => {

		try {

			const newMessage = new Chat({

				sender: req.user._id,

				message: req.body.message,

				role:
					req.user.role ||
					"user",
			});

			await newMessage.save();

			const populatedMessage =
				await Chat.findById(
					newMessage._id
				).populate(
					"sender",
					"name email"
				);

			res.status(201).json(
				populatedMessage
			);

		} catch (error) {

			console.log(
				"POST CHAT ERROR:",
				error
			);

			res.status(500).json({
				message: "Server Error",
			});
		}
	}
);

export default router;