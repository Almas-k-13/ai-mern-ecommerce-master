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

	const { fetchAllProducts } = useProductStore();



	useEffect(() => {

		fetchAllProducts();

	}, [fetchAllProducts]);



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
					<ProductsList />
				}

				{
					activeTab === "orders" &&
					<OrdersList />
				}

				{
					activeTab === "analytics" &&
					<AnalyticsTab />
				}

			</div>

		</div>
	);
};

export default AdminPage;