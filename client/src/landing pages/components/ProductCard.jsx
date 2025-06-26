import { Heart, Star } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({ product, addToCart, cart = [] }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const isInCart = cart.some((item) => item.id === product.id);
  const imageUrl = `${import.meta.env.VITE_API_BASE_URL_For_Image}${
    product.images[0]?.url || ""
  }`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative aspect-[4/3] bg-gray-100 flex items-center justify-center">
        <Link to={`/shop-product/${product.id}`} className="w-full h-full">
          {!imageError ? (
            <img
              src={imageUrl}
              alt={product?.name || "Product"}
              className="w-full h-full object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="text-gray-400 text-sm flex justify-center items-center w-full h-full">
              Image not available
            </div>
          )}
        </Link>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{product.brand}</span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through ml-2">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mb-6">
          {product.stock ? (
            <>
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-green-600 font-medium">
                In Stock ({product.stock} available)
              </span>
            </>
          ) : (
            <div className="flex flex-col items-start">
              <div className="flex gap-2 items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-red-600 font-medium">Out of Stock</span>
              </div>

              {!product.stock && (
                <p className="text-sm text-red-500 mt-1">
                  This product is currently out of stock.
                </p>
              )}
            </div>
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
          <Link
            to={`/shop-product/${product.id}`}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
