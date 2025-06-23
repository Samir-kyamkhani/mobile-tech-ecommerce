import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { useNavigate } from "react-router-dom"; // ⬅️ For navigation

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    originalPrice: 1299,
    category: "smartphones",
    image: "https://m.media-amazon.com/images/I/81dT7CUY6GL.jpg",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    features: [
      '6.7" Super Retina XDR',
      "A17 Pro chip",
      "256GB storage",
      "48MP camera system",
    ],
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1099,
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
    rating: 4.7,
    reviews: 189,
    inStock: true,
    features: [
      '6.8" Dynamic AMOLED',
      "Snapdragon 8 Gen 3",
      "512GB storage",
      "S Pen included",
    ],
  },
  {
    id: 3,
    name: "Premium Leather Case",
    brand: "Apple",
    price: 59,
    category: "cases",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400",
    rating: 4.5,
    reviews: 67,
    inStock: true,
    features: [
      "Genuine leather",
      "Perfect fit",
      "Multiple colors",
      "Drop protection",
    ],
  },
];

export default function FeaturedProducts() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutRequested, setCheckoutRequested] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleBuy = (product) => {
    addToCart(product);
    setSelectedProduct(null);
    setCheckoutRequested(true);
  };

  useEffect(() => {
    if (checkoutRequested) {
      navigate("/checkout");
      setCheckoutRequested(false);
    }
  }, [checkoutRequested, navigate]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-center mb-12">
          Featured Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              onView={setSelectedProduct}
              cart={cart}
            />
          ))}
        </div>

        {/* ✅ Modal shown if selectedProduct exists */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onBuy={handleBuy}
        />
      </div>
    </section>
  );
}
