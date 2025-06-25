import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/slices/productSlice";

export default function FeaturedProducts() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const products = productState?.products || [];

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

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]); // ✅ Removed unnecessary dependencies

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
