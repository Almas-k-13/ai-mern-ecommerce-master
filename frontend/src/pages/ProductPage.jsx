import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const ProductPage = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCartStore();

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
                    <h1 className="text-4xl font-bold mb-4">
                        {product.name}
                    </h1>

                    <p className="text-emerald-400 text-3xl mb-4">
                        ₹{product.price}
                    </p>

                    <p className="text-gray-300 mb-6">
                        {product.description}
                    </p>

                    <p className="mb-4">
                        Category:
                        <span className="text-emerald-400 ml-2">
                            {product.category}
                        </span>
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg flex items-center gap-2"
                    >
                        <ShoppingCart size={20} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;