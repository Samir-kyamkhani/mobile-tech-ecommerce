import React from "react";

const ProductModal = ({ product, onClose, onBuy }) => {
  if (!product) return null;

  const {
    image,
    name,
    brand,
    price,
    features = [], // ✅ Provide a default to avoid `.map` crash
  } = product;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed z-50 inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div
          className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
            aria-label="Close"
          >
            &times;
          </button>

          <img
            src={`${import.meta.env.VITE_API_BASE_URL_For_Image}${image}`}
            alt={name}
            className="w-full h-48 object-contain mb-4"
          />

          <h4 className="text-xl font-semibold mb-2">{name}</h4>
          <p className="text-gray-600 mb-2">Brand: {brand}</p>
          <p className="text-lg font-bold mb-4">₹{price}</p>

          {features.length > 0 && (
            <ul className="mb-4 list-disc list-inside text-gray-700">
              {features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          )}

          <button
            onClick={() => onBuy(product)}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
