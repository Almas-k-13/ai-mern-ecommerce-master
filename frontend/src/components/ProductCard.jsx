import toast from "react-hot-toast";
import { ShoppingCart, Heart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { useWishlistStore } from "../stores/useWishlistStore";

const ProductCard = ({ product }) => {

	const { user } = useUserStore();

	const { addToCart } = useCartStore();

	const { addToWishlist } = useWishlistStore();

	const navigate = useNavigate();

	const handleAddToCart = async (e) => {
		e.preventDefault();

		e.stopPropagation();

		if (product.stock === 0) {

			toast.error("Product out of stock");

			return;
		}

		if (!user) {

			toast.error("Please login first", {
				id: "login",
			});

			navigate("/login");

			return;
		}

		try {

			await addToCart(product);

			toast.success("Product added to cart");

		} catch (error) {

			toast.error("Failed to add product");

			console.log(error);
		}
	};

	return (

		<Link to={`/product/${product._id}`}>

			<div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg hover:scale-105 transition-all duration-300 bg-gray-800">

				<div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">

					<img
						className="object-cover w-full"
						src={product.image}
						alt="product image"
					/>

					{
						product.stock === 0 && (

							<div
								className="
									absolute
									top-3
									left-3
									bg-red-500
									text-white
									text-xs
									font-bold
									px-3
									py-1
									rounded-full
									z-20
								"
							>
								Out Of Stock
							</div>
						)
					}

					<button
						onClick={(e) => {

							e.preventDefault();

							e.stopPropagation();

							if (!user) {

								toast.error(
									"Please login first"
								);

								return;
							}

							addToWishlist(product._id);

						}}
						className="
							absolute
							top-3
							right-3
							z-20
							bg-black/70
							p-2
							rounded-full
							hover:bg-red-500
							transition
						"
					>

						<Heart
							size={20}
							className="text-white"
						/>

					</button>

					<div className="absolute inset-0 bg-black bg-opacity-20 z-10" />

				</div>

				<div className="mt-4 px-5 pb-5">

					<h5 className="text-xl font-semibold tracking-tight text-white">
						{product.name}
					</h5>

					<p className="text-sm text-gray-400 mt-2 line-clamp-2">
						{product.description}
					</p>

					<div className="mt-4 mb-5 flex items-center justify-between">

						<p>

							<span className="text-3xl font-bold text-emerald-400">
								₹{product.price}
							</span>

						</p>

					</div>

					<button
						disabled={product.stock === 0}
						onClick={handleAddToCart}
						className={`
							flex
							items-center
							justify-center
							rounded-lg
							px-5
							py-2.5
							text-center
							text-sm
							font-medium
							text-white
							w-full
							transition
							${product.stock === 0
								? "bg-gray-500 cursor-not-allowed"
								: "bg-emerald-600 hover:bg-emerald-700"
							}
						`}
					>

						<ShoppingCart
							size={22}
							className="mr-2"
						/>

						{
							product.stock === 0
								? "Out Of Stock"
								: "Add to cart"
						}

					</button>

				</div>

			</div>

		</Link>
	);
};

export default ProductCard;