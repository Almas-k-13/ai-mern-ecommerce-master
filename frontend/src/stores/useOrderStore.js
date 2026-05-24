import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useOrderStore = create((set) => ({
	orders: [],
	loading: false,

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



	updateOrderStatus: async (id, status) => {

		try {
			await axios.put(`/orders/${id}`, {
				status,
			});
			toast.success("Order status updated");
		} catch (error) {
			console.log(error);
			toast.error("Failed to update status");
		}
	},
}));