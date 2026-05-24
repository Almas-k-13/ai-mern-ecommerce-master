import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";
import toast from "react-hot-toast";

const PurchaseSuccessPage = () => {

	const [isProcessing, setIsProcessing] = useState(true);
	const [error, setError] = useState(null);

	const {
		cart,
		clearCart,
		total,
	} = useCartStore();

	useEffect(() => {
		console.log("PAGE OPENED");
		const handleCheckoutSuccess = async () => {

			try {

				console.log("PAYMENT VERIFIED");

				// create order
				const orderData = {
					products: cart.map((item) => ({
						product: item._id,
						quantity: item.quantity,
					})),
					totalAmount: total,
				};

				console.log("ORDER DATA:", orderData);
				console.log("CREATING ORDER...");
				const orderRes = await axios.post(
					"/orders",
					orderData
				);

				console.log("ORDER CREATED:", orderRes.data);

				// clear cart
				await clearCart();

				toast.success("Order placed successfully");

			} catch (error) {

				console.log("ORDER ERROR:", error);

				setError(
					error.response?.data?.message ||
					"Failed to create order"
				);

			} finally {

				setIsProcessing(false);
			}
		};

		setIsProcessing(false);

	}, []);

	if (isProcessing) {
		return (
			<div className="text-white text-center mt-20">
				Processing Payment...
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-red-500 text-center mt-20">
				{error}
			</div>
		);
	}

	return (
		<div className='h-screen flex items-center justify-center px-4'>

			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'>

				<div className='p-6 sm:p-8'>

					<div className='flex justify-center'>
						<CheckCircle className='text-emerald-400 w-16 h-16 mb-4' />
					</div>

					<h1 className='text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2'>
						Purchase Successful!
					</h1>

					<p className='text-gray-300 text-center mb-2'>
						Thank you for your order.
					</p>

					<p className='text-emerald-400 text-center text-sm mb-6'>
						Order successfully placed.
					</p>

					<div className='space-y-4'>

						<button
							className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center'
						>
							<HandHeart className='mr-2' size={18} />
							Thanks for trusting us!
						</button>

						<Link
							to={"/"}
							className='w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center'
						>
							Continue Shopping
							<ArrowRight className='ml-2' size={18} />
						</Link>

					</div>

				</div>

			</div>

		</div>
	);
};

export default PurchaseSuccessPage;