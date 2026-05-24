import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
			default: 1,
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
		category: {
			type: String,
			required: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		reviews: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},

				name: String,

				rating: Number,

				comment: String,

				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		numReviews: {
			type: Number,
			default: 0,
		},

		averageRating: {
			type: Number,
			default: 0,
		},

	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
