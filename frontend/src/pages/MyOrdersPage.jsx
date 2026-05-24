import { useEffect, useState } from "react";
import axios from "../lib/axios";

const MyOrdersPage = () => {

	const [orders, setOrders] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {

		const fetchOrders = async () => {

			try {

				const res = await axios.get("/orders/my-orders");

				setOrders(res.data.orders);

			} catch (error) {

				console.log(error);

			} finally {

				setLoading(false);
			}
		};

		fetchOrders();

	}, []);

	if (loading) {

		return (
			<div className="text-white text-center mt-20">
				Loading...
			</div>
		);
	}

	return (

		<div className="min-h-screen text-white p-6">

			<h1 className="text-4xl font-bold text-emerald-400 mb-8">
				My Orders
			</h1>

			<div className="space-y-6">

				{orders.length === 0 ? (

					<p>No orders found</p>

				) : (

					orders.map((order) => (

						<div
							key={order._id}
							className="bg-gray-800 p-6 rounded-xl border border-gray-700"
						>

							<div className="flex justify-between mb-4">

								<div>

									<p className="text-gray-400">
										Order ID
									</p>

									<p className="text-sm">
										{order._id}
									</p>

								</div>

								<div>

									<p className="text-gray-400">
										Status
									</p>

									<p className="text-emerald-400 font-semibold">
										{order.orderStatus}
									</p>

								</div>

							</div>

							<div className="space-y-4">

								{order.products.map((item) => (

									<div
										key={item._id}
										className="flex items-center gap-4 border-b border-gray-700 pb-4"
									>

										<img
											src={item.product.image}
											alt={item.product.name}
											className="w-20 h-20 rounded-lg object-cover"
										/>

										<div>

											<h2 className="font-semibold">
												{item.product.name}
											</h2>

											<p className="text-gray-400">
												Quantity: {item.quantity}
											</p>

										</div>

									</div>
								))}
							</div>

							<div className="mt-4 text-right">

								<p className="text-2xl font-bold text-emerald-400">
									₹{order.totalAmount}
								</p>

							</div>

						</div>
					))
				)}
			</div>

		</div>
	);
};

export default MyOrdersPage;