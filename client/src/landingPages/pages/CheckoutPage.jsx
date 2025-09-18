import React, { useEffect, useState } from "react";
import { Truck, Shield, Star, Minus, Plus, X, CheckCircle } from "lucide-react";
import { createOrder, getAllOrders } from "../../redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing saved cart:", error);
      return [];
    }
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const [shippingInfo, setShippingInfo] = useState(() => ({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    address: user?.location || "",
    city: "",
    zip: "",
  }));

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
      return updatedCart;
    });
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role === "Admin") {
      // Show an error message
      alert("Only customers can place orders.");
      return;
    }

    setIsProcessing(true);

    const order = {
      items: cart,
      shipping: shippingInfo,
      total: getTotalPrice(),
      paymentMethod: "Cash on Delivery",
    };

    try {
      await dispatch(createOrder(order)).unwrap?.(); // unwrap if using RTK
      dispatch(getAllOrders());

      setOrderDetails(order);
      setOrderPlaced(true);
      setCart([]);
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const firstProductId = orderDetails?.items?.[0]?.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Checkout
            </h1>
          </div>
        </div>
      </div>

      {orderPlaced ? (
        <div className="flex items-center justify-center">
          <div className="max-w-3xl my-12 mx-4 p-6 bg-white/90 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center space-x-3">
              <CheckCircle className="w-8 h-8" />
              <span>Thank you for your order!</span>
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
              <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
                {orderDetails.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between py-3 text-gray-800"
                  >
                    <div>
                      {item.name} × {item.quantity}
                    </div>
                    <div>₹{item.price * item.quantity}</div>
                  </li>
                ))}
              </ul>
              <div className="text-right font-semibold text-lg mt-4">
                Total: ₹{orderDetails.total}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Shipping Information
              </h3>
              <p className="text-gray-700">
                {orderDetails.shipping.firstName}{" "}
                {orderDetails.shipping.lastName}
                <br />
                {orderDetails.shipping.address}, {orderDetails.shipping.city}
                <br />
                ZIP: {orderDetails.shipping.zip}
                <br />
                Email: {orderDetails.shipping.email}
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 mt-6 w-full">
              <Link
                to="/profile"
                state={{ tab: "orders" }}
                className={`px-6 py-3 rounded-xl font-semibold w-full md:w-1/2 transition text-center ${
                  firstProductId
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none"
                }`}
              >
                View Ordered Product
              </Link>

              <Link
                to="/"
                onClick={() => setOrderPlaced(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition w-full md:w-1/2 text-center"
              >
                Back to Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
              {/* Left Column */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8">
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
                      {
                        name: "lastName",
                        placeholder: "Last Name",
                        type: "text",
                      },
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
                      {
                        name: "zip",
                        placeholder: "ZIP/Postal Code",
                        type: "text",
                      },
                    ].map(({ name, placeholder, type, colSpan }) => (
                      <input
                        key={name}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={shippingInfo[name]}
                        onChange={handleShippingChange}
                        className={`rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                          colSpan ? "sm:col-span-2" : ""
                        }`}
                        required
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                      Payment Method
                    </h3>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold text-gray-800">
                      Cash on Delivery
                    </p>
                    <p className="text-gray-600 text-sm max-w-md">
                      Pay when you receive your items at your doorstep.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-4">
                <div className="bg-white w-fit backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Order Summary
                  </h2>

                  {cart.length === 0 ? (
                    <p className="text-gray-700">Your cart is empty.</p>
                  ) : (
                    <ul className="divide-y divide-gray-300 max-h-72 overflow-y-auto">
                      {cart.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center justify-between py-4"
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={`${
                                import.meta.env.VITE_API_BASE_URL_For_Image
                              }${item.images?.[0]?.url ?? "default.jpg"}`}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="min-w-0 flex flex-col">
                              <span className="text-gray-900 font-semibold truncate max-w-[12rem] sm:max-w-[16rem] md:max-w-[20rem]">
                                {item.name}
                              </span>
                              <span className="text-gray-500 text-sm">
                                ₹{item.price} × {item.quantity}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.name}`}
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 rounded-md hover:bg-gray-200 transition"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.name}`}
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 rounded-md hover:bg-gray-200 transition"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              aria-label={`Remove ${item.name} from cart`}
                              onClick={() => removeItem(item.id)}
                              className="p-1 rounded-md hover:bg-red-100 transition"
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 flex justify-between font-semibold text-lg text-gray-900 border-t border-gray-300 pt-4">
                    <span>Total:</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={cart.length === 0 || isProcessing}
                    className={`mt-6 w-full py-3 rounded-xl text-white font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      cart.length === 0 || isProcessing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    aria-disabled={cart.length === 0 || isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;
