import React, { useState } from "react";
import { CreditCard, Truck, Shield, Star, Minus, Plus, X } from "lucide-react";

const CheckoutPage = () => {
  // Initial cart state with quantity
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
      price: 59.99,
      quantity: 2,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Smartwatch",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
      price: 149.99,
      quantity: 1,
      rating: 4.8,
    },
  ]);

  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle quantity changes
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Form state for shipping and payment info
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardholderName: "",
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    alert("Order placed successfully!");
  };

  const steps = [
    { number: 1, title: "Shipping", icon: Truck },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Review", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Checkout
            </h1>
            <div className="hidden sm:flex items-center space-x-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep >= step.number;
                return (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ₹{
                        isActive
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ₹{
                        isActive ? "text-blue-600" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="w-8 h-px bg-gray-300 ml-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Shipping Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {[
                  {
                    name: "firstName",
                    placeholder: "First Name",
                    type: "text",
                  },
                  { name: "lastName", placeholder: "Last Name", type: "text" },
                  {
                    name: "email",
                    placeholder: "Email Address",
                    type: "email",
                    colSpan: true,
                  },
                  {
                    name: "address",
                    placeholder: "Street Address",
                    type: "text",
                    colSpan: true,
                  },
                  { name: "city", placeholder: "City", type: "text" },
                  { name: "zip", placeholder: "ZIP Code", type: "text" },
                ].map(({ name, placeholder, type, colSpan }) => (
                  <div
                    key={name}
                    className={`₹{
                      colSpan ? "sm:col-span-2" : ""
                    } relative group`}
                  >
                    <input
                      id={name}
                      name={name}
                      type={type}
                      placeholder=" "
                      value={shippingInfo[name]}
                      onChange={handleShippingChange}
                      required
                      className="peer w-full rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm px-4 pt-6 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                    />
                    <label
                      htmlFor={name}
                      className="absolute left-4 top-2 text-gray-600 text-sm font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-blue-600 peer-focus:text-sm cursor-text"
                    >
                      {placeholder}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6 max-h-64 lg:max-h-80 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="group relative">
                      <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-white/50 transition-all duration-200">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-gray-100 group-hover:border-blue-200 transition-all duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                            {item.name}
                          </h4>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600">
                              {item.rating}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity === 1}
                                className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-semibold text-sm min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-bold text-gray-900 text-sm">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>₹{(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>₹{(getTotalPrice() * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-4 text-lg font-bold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Place Order"
                  )}
                </button>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 mt-4 text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">
                    Secure checkout with 256-bit SSL encryption
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
