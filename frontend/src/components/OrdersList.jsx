import { useEffect } from "react";
import { motion } from "framer-motion";
import { useOrderStore } from "../stores/useOrderStore";
import toast from "react-hot-toast";

const OrdersList = () => {

	const {
		orders,
		fetchAllOrders,
		updateOrderStatus,
	} = useOrderStore();

	useEffect(() => {
		fetchAllOrders();
	}, [fetchAllOrders]);

	const handleStatusChange = async (
		orderId,
		status
	) => {

		try {

			await updateOrderStatus(
				orderId,
				status
			);

			toast.success(
				"Order status updated"
			);

		} catch (error) {

			console.log(error);

			toast.error(
				"Failed to update status"
			);
		}
	};

	return (
		<motion.div
			className="
				bg-gray-800/50
				backdrop-blur-md
				shadow-lg
				rounded-xl
				p-6
				border
				border-gray-700
				mt-6
			"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>

			<h2 className="text-2xl font-bold mb-6 text-emerald-400">
				Orders List
			</h2>

			<div className="overflow-x-auto">

				<table className="min-w-full divide-y divide-gray-700">

					<thead>

						<tr>

							<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
								User
							</th>

							<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
								Products
							</th>

							<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
								Amount
							</th>

							<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
								Payment
							</th>

							<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
								Status
							</th>

						</tr>

					</thead>

					<tbody className="divide-y divide-gray-700">

						{orders.map((order) => (

							<tr
								key={order._id}
								className="hover:bg-gray-700/40 transition"
							>

								<td className="px-6 py-4 whitespace-nowrap">

									<div>

										<div className="text-sm font-medium text-white">
											{order.user?.name}
										</div>

										<div className="text-sm text-gray-400">
											{order.user?.email}
										</div>

									</div>

								</td>

								<td className="px-6 py-4">

									{order.products.map((item) => (

										<div
											key={item._id}
											className="text-sm text-white mb-1"
										>

											{item.product?.name} x {item.quantity}

										</div>

									))}

								</td>

								<td className="px-6 py-4 text-emerald-400 font-semibold">
									₹{order.totalAmount}
								</td>

								<td className="px-6 py-4">

									<span
										className={`
											px-3
											py-1
											inline-flex
											text-xs
											leading-5
											font-semibold
											rounded-full
											${order.paymentStatus === "Paid"
												? "bg-green-100 text-green-800"
												: "bg-yellow-100 text-yellow-800"
											}
										`}
									>

										{order.paymentStatus}

									</span>

								</td>

								<td className="px-6 py-4">

									<select
										value={order.orderStatus}
										onChange={(e) =>
											handleStatusChange(
												order._id,
												e.target.value
											)
										}
										className="
											bg-gray-700
											text-white
											px-3
											py-2
											rounded-lg
											outline-none
										"
									>

										<option value="Pending">
											Pending
										</option>

										<option value="Processing">
											Processing
										</option>

										<option value="Shipped">
											Shipped
										</option>

										<option value="Delivered">
											Delivered
										</option>

										<option value="Cancelled">
											Cancelled
										</option>

									</select>

								</td>

							</tr>

						))}

					</tbody>

				</table>

			</div>

		</motion.div>
	);
};

export default OrdersList;