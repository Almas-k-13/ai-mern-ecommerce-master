import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Link } from "react-router-dom";

const SearchBar = () => {

    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {

            if (!query.trim()) {
                setProducts([]);
                return;
            }

            try {

                const res = await axios.get(`/products/search?query=${query}`);

                setProducts(res.data.products);

            } catch (error) {

                console.log(error);
            }
        };

        fetchProducts();

    }, [query]);

    return (

        <div className="relative">

            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="
		bg-gray-800
		text-white
		px-4
		py-2
		rounded-lg
		outline-none
		w-[250px]
		border
		border-gray-700
		focus:border-emerald-500
	"
            />

            {
	query && products.length > 0 && (

		<div
			className="
				absolute
				top-14
				left-0
				w-[350px]
				bg-gray-900
				border
				border-gray-700
				rounded-xl
				p-3
				shadow-2xl
				z-50
				max-h-[500px]
				overflow-y-auto
			"
		>

			{
				products.map((product) => (

					<Link
						to={`/product/${product._id}`}
						key={product._id}
					>

						<div
							className="
								flex
								items-center
								gap-3
								p-2
								hover:bg-gray-800
								rounded-lg
								transition
							"
						>

							<img
								src={product.image}
								alt={product.name}
								className="
									w-16
									h-16
									object-cover
									rounded
								"
							/>

							<div>

								<h2 className="text-white font-semibold">
									{product.name}
								</h2>

								<p className="text-emerald-400">
									₹{product.price}
								</p>

							</div>

						</div>

					</Link>
				))
			}

		</div>
	)
}
        </div>
    );
};

export default SearchBar;