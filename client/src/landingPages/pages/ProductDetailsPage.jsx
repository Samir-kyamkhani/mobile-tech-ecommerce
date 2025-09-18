import React, { useState, useEffect } from "react";
import {
  Heart,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Truck,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct } from "../../redux/slices/productSlice";

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [addedToCart, setAddedToCart] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.product);
  const { products, loading } = productState;

  const product = products.find((p) => String(p.id) === String(id));

  useEffect(() => {
    if (!products.length || !product) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const updatedCart = [...cart];
    const existing = updatedCart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setAddedToCart(true);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleBuyNow = () => {
    const updatedCart = [...cart];
    const existing = updatedCart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    navigate("/checkout");
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
            ? "fill-yellow-400/50 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  const baseUrl = import.meta.env.VITE_API_BASE_URL_For_Image;
  const currentImage = product.images?.[selectedImage]?.url;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-lg">Product Details</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Image Gallery */}
          <div className="mb-8 lg:mb-0">
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 mb-4">
                {!imageError && currentImage ? (
                  <img
                    src={baseUrl + currentImage}
                    alt={product?.name || "Product"}
                    className="w-full h-full object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="text-gray-400 text-sm flex justify-center items-center w-full h-full">
                    Image not available
                  </div>
                )}
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(index);
                      setImageError(false);
                    }}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={baseUrl + img.url}
                      alt={`${product.name} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="mb-4">
                <p className="text-blue-600 font-medium text-sm mb-1">
                  {product.createdby}
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating || 4)}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {product.rating || 0}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product.reviewCount?.toLocaleString() || "0"} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
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
                        <span className="text-red-600 font-medium">
                          Out of Stock
                        </span>
                      </div>
                      <p className="text-sm text-red-500 mt-1">
                        This product is currently out of stock.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center bg-gray-100 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-200 rounded-l-lg disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-gray-200 rounded-r-lg disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  disabled={!product.stock}
                  className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-transform
                    ${
                      product.stock
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02]"
                        : "bg-gray-300 text-white cursor-not-allowed"
                    }`}
                >
                  <Zap className="w-5 h-5" />
                  Buy Now
                </button>

                {addedToCart ? (
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 transition-transform"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Go to Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.stock}
                    className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2
                      ${
                        product.stock
                          ? "bg-white border-2 border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50"
                          : "bg-gray-100 border-2 border-gray-300 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-green-500" />
                    Free Shipping
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500" />1 Year Warranty
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description at Bottom */}
        <div className="mt-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Description
            </h2>
            {product.description ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {product.description.split("\n").map((point, index) => (
                  <li key={index}>{point.trim()}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No description available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
