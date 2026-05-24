import Order from "../models/order.model.js";

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

		const { products, totalAmount } = req.body;

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