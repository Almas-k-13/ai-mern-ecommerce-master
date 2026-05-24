import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const getMyOrders = async (req, res) => {
	try {
		const orders = await Order.find({
			user: req.user._id,
		})
			.populate("products.product")
			.sort({ createdAt: -1 });

		res.status(200).json({
			success: true,
			orders,
		});
	} catch (error) {
		console.log("Get my orders error:", error);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

export const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()

            .populate("user", "name email")

            .populate("products.product");

        res.status(200).json({
            success: true,
            orders,
        });

    } catch (error) {

        console.log("Error in getAllOrders", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};



export const updateOrderStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            {
                orderStatus: status,
            },

            {
                new: true,
            }
        );

        res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {

        console.log("Error in updateOrderStatus", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const createOrder = async (req, res) => {

	try {

		const {
			products,
			totalAmount,
		} = req.body;

		// stock check
		for (const item of products) {

			const product =
				await Product.findById(
					item.product
				);

			if (!product) {

				return res.status(404).json({
					message: "Product not found",
				});
			}

			if (
				product.stock < item.quantity
			) {

				return res.status(400).json({
					message: `${product.name} is out of stock`,
				});
			}
		}

		// reduce stock
		for (const item of products) {

			await Product.findByIdAndUpdate(

				item.product,

				{
					$inc: {
						stock: -item.quantity,
					},
				}
			);
		}

		// create order
		const newOrder = new Order({

			user: req.user._id,

			products,

			totalAmount,

			paymentStatus: "Paid",

			orderStatus: "Pending",
		});

		await newOrder.save();

		res.status(201).json({

			success: true,

			order: newOrder,
		});

	} catch (error) {

		console.log(
			"Create order error:",
			error
		);

		res.status(500).json({
			message: "Server Error",
		});
	}
};