import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(

	{
		user: {

			type: mongoose.Schema.Types.ObjectId,

			ref: "User",

			required: true,
		},

		products: [

			{
				product: {

					type: mongoose.Schema.Types.ObjectId,

					ref: "Product",
				},

				quantity: {

					type: Number,

					default: 1,
				},
			},
		],

		totalAmount: {

			type: Number,

			required: true,
		},

		paymentStatus: {

			type: String,

			enum: ["Pending", "Paid"],

			default: "Pending",
		},

		orderStatus: {

			type: String,

			enum: [
				"Pending",
				"Processing",
				"Shipped",
				"Delivered",
				"Cancelled",
			],

			default: "Pending",
		},

		shippingAddress: {

			type: String,

			default: "",
		},
	},

	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;