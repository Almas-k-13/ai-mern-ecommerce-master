import Wishlist from "../models/wishlist.model.js";

export const addToWishlist = async (req, res) => {

	try {

		const userId = req.user._id;

		const { productId } = req.body;

		const existing = await Wishlist.findOne({
			user: userId,
			product: productId,
		});

		if (existing) {

			return res.status(400).json({
				message: "Product already in wishlist",
			});
		}

		const wishlistItem = await Wishlist.create({
			user: userId,
			product: productId,
		});

		res.status(201).json(wishlistItem);

	} catch (error) {

		console.log(error);

		res.status(500).json({
			message: "Server Error",
		});
	}
};

export const getWishlist = async (req, res) => {

	try {

		const userId = req.user._id;

		const wishlist = await Wishlist.find({
			user: userId,
		}).populate("product");

		res.status(200).json(wishlist);

	} catch (error) {

		console.log(error);

		res.status(500).json({
			message: "Server Error",
		});
	}
};

export const removeFromWishlist = async (req, res) => {

	try {

		const userId = req.user._id;

		const { productId } = req.params;

		await Wishlist.findOneAndDelete({
			user: userId,
			product: productId,
		});

		res.status(200).json({
			message: "Removed from wishlist",
		});

	} catch (error) {

		console.log(error);

		res.status(500).json({
			message: "Server Error",
		});
	}
};