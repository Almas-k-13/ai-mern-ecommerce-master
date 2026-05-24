import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../lib/axios";

import {
    ShoppingCart,
    Star,
} from "lucide-react";

import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";

import toast from "react-hot-toast";

const ProductPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");

    const { addToCart } = useCartStore();

    const { user } = useUserStore();

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const res = await axios.get("/products");

                const foundProduct = res.data.products.find(
                    (item) => item._id === id
                );

                setProduct(foundProduct);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

        fetchProduct();

    }, [id]);



    const handleReviewSubmit = async () => {

        if (!user) {

            toast.error("Please login first");

            navigate("/login");

            return;
        }

        if (!comment.trim()) {

            toast.error("Please write a review");

            return;
        }

        try {

            await axios.post(

                `/products/${product._id}/review`,

                {
                    rating,
                    comment,
                }
            );

            toast.success("Review added");

            window.location.reload();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add review"
            );
        }
    };



    const handleAddToCart = async () => {

        if (!user) {

            toast.error("Please login first");

            navigate("/login");

            return;
        }

        try {

            await addToCart(product);

            toast.success("Product added to cart");

        } catch (error) {

            console.log(error);

            toast.error("Failed to add product");
        }
    };



    if (loading) {

        return (

            <div className="text-white text-center mt-20">

                Loading...

            </div>
        );
    }



    if (!product) {

        return (

            <div className="text-white text-center mt-20">

                Product not found

            </div>
        );
    }



    return (

        <div className="min-h-screen text-white px-6 py-10">

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-xl w-full h-[500px] object-cover"
                />

                <div>

                    <h1 className="text-4xl font-bold mb-3">
                        {product.name}
                    </h1>



                    <div className="flex items-center gap-2 mb-5">

                        <Star
                            size={22}
                            className="text-yellow-400"
                            fill="currentColor"
                        />

                        <span className="text-lg">

                            {
                                product.averageRating?.toFixed(1) || 0
                            }

                        </span>

                        <span className="text-gray-400">

                            (
                            {product.numReviews || 0}
                            {" "}reviews)

                        </span>

                    </div>



                    <p className="text-emerald-400 text-3xl mb-4">
                        ₹{product.price}
                    </p>
                    <div className="mb-4">

                        {
                            product.stock > 0 ? (

                                <span className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold">
                                    In Stock : {product.stock}
                                </span>

                            ) : (

                                <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-semibold">
                                    Out Of Stock
                                </span>
                            )
                        }

                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    <p className="mb-6">

                        Category:

                        <span className="text-emerald-400 ml-2">

                            {product.category}

                        </span>

                    </p>



                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className={`px-6 py-3 rounded-lg flex items-center gap-2 ${product.stock === 0
                                ? "bg-red-600 cursor-not-allowed"
                                : "bg-emerald-500 hover:bg-emerald-600"
                            }`}
                    >

                        <ShoppingCart size={20} />

                        {
                            product.stock === 0
                                ? "Out Of Stock"
                                : "Add To Cart"
                        }

                    </button>
                </div>

            </div>



            {/* REVIEWS SECTION */}

            <div className="max-w-6xl mx-auto mt-20">

                <h2 className="text-4xl font-bold mb-10 text-emerald-400">
                    Product Reviews
                </h2>

                {/* REVIEW FORM */}

                <div className="bg-gray-900/70 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-2xl mb-12">

                    <h3 className="text-2xl font-bold mb-6">
                        Write a Review
                    </h3>

                    {/* STAR SELECTOR */}

                    <div className="flex items-center gap-3 mb-6">

                        {
                            [1, 2, 3, 4, 5].map((star) => (

                                <Star
                                    key={star}
                                    size={32}
                                    onClick={() => setRating(star)}
                                    className={`
							cursor-pointer
							transition-all
							duration-200
							hover:scale-125
							${rating >= star
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-500"
                                        }
						`}
                                />
                            ))
                        }

                    </div>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience about this product..."
                        rows={5}
                        className="
				w-full
				p-4
				rounded-xl
				bg-gray-800
				text-white
				border
				border-gray-700
				outline-none
				focus:border-emerald-500
				transition
				resize-none
				mb-5
			"
                    />

                    <button
                        onClick={handleReviewSubmit}
                        className="
				bg-emerald-500
				hover:bg-emerald-600
				px-8
				py-3
				rounded-xl
				font-semibold
				text-lg
				transition-all
				duration-300
				hover:scale-105
			"
                    >
                        Submit Review
                    </button>

                </div>

                {/* REVIEWS LIST */}

                <div className="space-y-6">

                    {
                        product.reviews?.length === 0 && (

                            <div className="text-center text-gray-400 text-lg">

                                No reviews yet 😔

                            </div>
                        )
                    }

                    {
                        product.reviews?.map((review) => (

                            <div
                                key={review._id}
                                className="
						bg-gray-900/70
						backdrop-blur-md
						border
						border-gray-700
						p-6
						rounded-2xl
						hover:border-emerald-500
						transition-all
						duration-300
					"
                            >

                                <div className="flex items-center justify-between mb-4">

                                    <div className="flex items-center gap-4">

                                        <div className="
								w-12
								h-12
								rounded-full
								bg-emerald-500
								flex
								items-center
								justify-center
								font-bold
								text-xl
							">

                                            {review.name?.charAt(0).toUpperCase()}

                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-lg">

                                                {review.name}

                                            </h3>

                                            <p className="text-gray-400 text-sm">

                                                Verified Buyer

                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-1">

                                        {
                                            [...Array(review.rating)].map((_, index) => (

                                                <Star
                                                    key={index}
                                                    size={18}
                                                    className="text-yellow-400 fill-yellow-400"
                                                />
                                            ))
                                        }

                                    </div>

                                </div>

                                <p className="text-gray-300 leading-relaxed text-lg">

                                    {review.comment}

                                </p>

                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    );
};

export default ProductPage;