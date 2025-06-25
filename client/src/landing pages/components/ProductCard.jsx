import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, addToCart, onView, cart = [] }) => {
  const navigate = useNavigate();

  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL_For_Image}${product.image}`}
          alt={product.name || "Product image"}
          className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
        />

        <button
          type="button"
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Add to wishlist"
        >
          <Heart size={20} className="text-gray-600 hover:text-red-500" />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{product.brand}</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through ml-2">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          {isInCart ? (
            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Go to Cart
            </button>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add to Cart
            </button>
          )}
          <button
            type="button"
            onClick={() => onView(product)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
