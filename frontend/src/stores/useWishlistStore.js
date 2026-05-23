import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useWishlistStore = create((set) => ({

	wishlist: [],
	loading: false,

	getWishlist: async () => {

		set({ loading: true });

		try {

			const res = await axios.get("/wishlist");

			set({
				wishlist: res.data,
				loading: false,
			});

		} catch (error) {

			console.log(error);

			set({ loading: false });
		}
	},

	addToWishlist: async (productId) => {

		try {

			const res = await axios.post("/wishlist", {
				productId,
			});

			set((state) => ({
				wishlist: [...state.wishlist, res.data],
			}));

			toast.success("Product added to wishlist");

		} catch (error) {

			console.log(error);

			toast.error(
				error.response?.data?.message ||
				"Wishlist Error"
			);
		}
	},

	removeFromWishlist: async (productId) => {

		try {

			await axios.delete(`/wishlist/${productId}`);

			set((state) => ({
				wishlist: state.wishlist.filter(
					(item) => item.product._id !== productId
				),
			}));

			toast.success("Removed from wishlist");

		} catch (error) {

			console.log(error);
		}
	},
}));