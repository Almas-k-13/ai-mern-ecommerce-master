import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	products: [],
	featuredProducts: [],
	loading: false,
	error: null,

	setProducts: (products) => set({ products }),

	createProduct: async (productData) => {
		set({ loading: true });

		try {
			const res = await axios.post("/products", productData);

			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));

			toast.success("Product created successfully");
		} catch (error) {
			console.log(error);

			toast.error(
				error?.response?.data?.error || "Failed to create product"
			);

			set({ loading: false });
		}
	},

	fetchAllProducts: async () => {
		set({ loading: true });

		try {
			const response = await axios.get("/products");

			set({
				products: response.data.products,
				loading: false,
			});
		} catch (error) {
			console.log("Fetch products error:", error);

			set({
				error: "Failed to fetch products",
				loading: false,
			});
		}
	},

	fetchProductsByCategory: async (category) => {
		set({ loading: true });

		try {
			const response = await axios.get(`/products/category/${category}`);

			set({
				products: response.data.products,
				loading: false,
			});
		} catch (error) {
			console.log("Category fetch error:", error);

			set({
				error: "Failed to fetch category products",
				loading: false,
			});
		}
	},

	deleteProduct: async (productId) => {
		set({ loading: true });

		try {
			await axios.delete(`/products/${productId}`);

			set((prevProducts) => ({
				products: prevProducts.products.filter(
					(product) => product._id !== productId
				),
				loading: false,
			}));

			toast.success("Product deleted");
		} catch (error) {
			console.log(error);

			set({ loading: false });

			toast.error(
				error?.response?.data?.error || "Failed to delete product"
			);
		}
	},

	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });

		try {
			const response = await axios.patch(`/products/${productId}`);

			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId
						? {
							...product,
							isFeatured: response.data.isFeatured,
						}
						: product
				),
				loading: false,
			}));

			toast.success("Product updated");
		} catch (error) {
			console.log(error);

			set({ loading: false });

			toast.error(
				error?.response?.data?.error || "Failed to update product"
			);
		}
	},

	fetchFeaturedProducts: async () => {

		set({ loading: true });

		try {

			const response = await axios.get("/products/featured");

			set({
				featuredProducts: response.data,
				loading: false,
			});

		} catch (error) {

			console.log("Error fetching featured products:", error);

			set({
				loading: false,
			});
		}
	},
	searchProducts: async (query) => {

		set({ loading: true });

		try {

			const response = await axios.get(
				`/products/search?query=${query}`
			);

			set({
				products: response.data.products,
				loading: false,
			});

		} catch (error) {

			console.log(error);

			set({
				loading: false,
			});
		}
	},
	updateProduct: async (id, updatedData) => {

		try {

			const res = await axios.put(
				`/products/${id}`,
				updatedData
			);

			set((state) => ({

				products: state.products.map((product) =>

					product._id === id
						? res.data
						: product
				),

			}));

			toast.success("Product updated successfully");

		} catch (error) {

			toast.error(
				error.response?.data?.message ||
				"Something went wrong"
			);
		}
	},
}));