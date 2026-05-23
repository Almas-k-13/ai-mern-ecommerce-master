import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";

import { useProductStore } from "../stores/useProductStore";

const SearchPage = () => {

	const { query } = useParams();

	const {
		products,
		searchProducts,
		loading,
	} = useProductStore();

	useEffect(() => {

		searchProducts(query);

	}, [query]);

	return (

		<div className="min-h-screen text-white px-6 py-10">

			<h1 className="text-4xl font-bold mb-10">

				Search:
				<span className="text-emerald-400 ml-3">
					{query}
				</span>

			</h1>

			{
				loading ? (

					<div>
						Loading...
					</div>

				) : (

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

						{
							products.map((product) => (

								<ProductCard
									key={product._id}
									product={product}
								/>
							))
						}

					</div>
				)
			}

		</div>
	);
};

export default SearchPage;