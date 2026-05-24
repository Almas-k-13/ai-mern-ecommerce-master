import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useOrderStore = create((set) => ({

	orders: [],
	loading: false,

	// ADMIN ALL ORDERS
	fetchAllOrders: async () => {

		set({ loading: true });

		try {

			const res = await axios.get("/orders");

			set({
				orders: res.data.orders,
				loading: false,
			});

		} catch (error) {

			console.log(error);

			toast.error("Failed to fetch orders");

			set({ loading: false });
		}
	},

	// USER MY ORDERS
	fetchMyOrders: async () => {

		set({ loading: true });

		try {

			const res = await axios.get("/orders/my-orders");

			set({
				orders: res.data.orders,
				loading: false,
			});

		} catch (error) {

			console.log(error);

			toast.error("Failed to fetch my orders");

			set({ loading: false });
		}
	},

	updateOrderStatus: async (orderId, status) => {

		try {

			await axios.put(`/orders/${orderId}`, {
				status,
			});

			set((state) => ({

				orders: state.orders.map((order) =>

					order._id === orderId

						? {
							...order,
							orderStatus: status,
						}

						: order
				),
			}));

			toast.success("Order status updated");

		} catch (error) {

			console.log(error);

			toast.error("Failed to update order");

		}
	},
}));