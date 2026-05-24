import {
	BarChart,
	PlusCircle,
	ShoppingBasket,
	Package,
} from "lucide-react";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import OrdersList from "../components/OrdersList";

import { useProductStore } from "../stores/useProductStore";



const tabs = [

	{
		id: "create",
		label: "Create Product",
		icon: PlusCircle,
	},

	{
		id: "products",
		label: "Products",
		icon: ShoppingBasket,
	},

	{
		id: "orders",
		label: "Orders",
		icon: Package,
	},

	{
		id: "analytics",
		label: "Analytics",
		icon: BarChart,
	},
];



const AdminPage = () => {

	const [activeTab, setActiveTab] = useState("create");

	const {
		fetchAllProducts,
		updateProduct
	} = useProductStore();

	const [editingProduct, setEditingProduct] = useState(null);

	useEffect(() => {

		fetchAllProducts();

	}, [fetchAllProducts]);
	const handleUpdateProduct = async () => {

		await updateProduct(
			editingProduct._id,
			editingProduct
		);

		setEditingProduct(null);
	};



	return (

		<div className="min-h-screen relative overflow-hidden">

			<div className="relative z-10 container mx-auto px-4 py-16">

				<motion.h1

					className="
						text-4xl
						font-bold
						mb-8
						text-emerald-400
						text-center
					"

					initial={{ opacity: 0, y: -20 }}

					animate={{ opacity: 1, y: 0 }}

					transition={{ duration: 0.8 }}

				>

					Admin Dashboard

				</motion.h1>



				<div className="flex flex-wrap justify-center mb-8 gap-3">

					{
						tabs.map((tab) => (

							<button

								key={tab.id}

								onClick={() =>
									setActiveTab(tab.id)
								}

								className={`
									flex
									items-center
									px-5
									py-3
									rounded-xl
									font-medium
									transition-all
									duration-300
									border
									${activeTab === tab.id

										? "bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20"

										: "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
									}
								`}
							>

								<tab.icon
									className="mr-2 h-5 w-5"
								/>

								{tab.label}

							</button>
						))
					}

				</div>



				{
					activeTab === "create" &&
					<CreateProductForm />
				}

				{
					activeTab === "products" &&
					<ProductsList
						setEditingProduct={setEditingProduct}
					/>
				}

				{
					activeTab === "orders" &&
					<OrdersList />
				}

				{
					activeTab === "analytics" &&
					<AnalyticsTab />
				}

				{
					editingProduct && (

						<div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4'>

							<div className='bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl w-full max-w-md p-6 relative animate-fadeIn'>

								<h2 className='text-3xl font-bold text-emerald-400 mb-6 text-center'>
									Edit Product
								</h2>

								<div className='space-y-5'>

									<div>
										<label className='block text-sm text-gray-300 mb-2'>
											Product Name
										</label>

										<input
											type='text'
											value={editingProduct.name}
											onChange={(e) =>
												setEditingProduct({
													...editingProduct,
													name: e.target.value,
												})
											}
											placeholder='Enter product name'
											className='
								w-full
								p-3
								rounded-xl
								bg-gray-800
								border
								border-gray-700
								text-white
								focus:outline-none
								focus:ring-2
								focus:ring-emerald-500
							'
										/>
									</div>

									<div>
										<label className='block text-sm text-gray-300 mb-2'>
											Price
										</label>

										<input
											type='number'
											value={editingProduct.price}
											onChange={(e) =>
												setEditingProduct({
													...editingProduct,
													price: e.target.value,
												})
											}
											placeholder='Enter product price'
											className='
								w-full
								p-3
								rounded-xl
								bg-gray-800
								border
								border-gray-700
								text-white
								focus:outline-none
								focus:ring-2
								focus:ring-emerald-500
							'
										/>
									</div>

									<div>
										<label className='block text-sm text-gray-300 mb-2'>
											Stock Quantity
										</label>

										<input
											type='number'
											value={editingProduct.stock}
											onChange={(e) =>
												setEditingProduct({
													...editingProduct,
													stock: e.target.value,
												})
											}
											placeholder='Enter stock quantity'
											className='
								w-full
								p-3
								rounded-xl
								bg-gray-800
								border
								border-gray-700
								text-white
								focus:outline-none
								focus:ring-2
								focus:ring-emerald-500
							'
										/>
									</div>

								</div>

								<div className='flex gap-4 mt-8'>

									<button
										onClick={handleUpdateProduct}
										className='
							w-full
							bg-emerald-600
							hover:bg-emerald-700
							transition
							py-3
							rounded-xl
							font-semibold
							text-white
						'
									>
										Update Product
									</button>

									<button
										onClick={() =>
											setEditingProduct(null)
										}
										className='
							w-full
							bg-red-600
							hover:bg-red-700
							transition
							py-3
							rounded-xl
							font-semibold
							text-white
						'
									>
										Cancel
									</button>

								</div>

							</div>

						</div>
					)
				}
			</div>

		</div>
	);
};

export default AdminPage;