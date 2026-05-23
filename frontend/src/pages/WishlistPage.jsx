import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { useWishlistStore } from "../stores/useWishlistStore";

const WishlistPage = () => {

	const {
		wishlist,
		getWishlist,
		removeFromWishlist,
	} = useWishlistStore();

	useEffect(() => {

		getWishlist();

	}, []);

	return (

		<div className="min-h-screen text-white px-6 py-10">

			<h1 className="text-4xl font-bold mb-10 text-emerald-400">
				My Wishlist
			</h1>

			{
				wishlist.length === 0 ? (

					<div className="text-center text-gray-400 text-xl">
						Your wishlist is empty
					</div>

				) : (

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

						{
							wishlist.map((item) => (

								<div
									key={item._id}
									className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
								>

									<Link to={`/product/${item.product._id}`}>

										<img
											src={item.product.image}
											alt={item.product.name}
											className="w-full h-64 object-cover"
										/>

									</Link>

									<div className="p-5">

										<h2 className="text-2xl font-semibold mb-2">
											{item.product.name}
										</h2>

										<p className="text-emerald-400 text-xl mb-4">
											₹{item.product.price}
										</p>

										<button
											onClick={() =>
												removeFromWishlist(
													item.product._id
												)
											}
											className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2"
										>

											<Trash2 size={18} />

											Remove

										</button>

									</div>

								</div>
							))
						}

					</div>
				)
			}

		</div>
	);
};

export default WishlistPage;