import { RefreshCw, Shield, Truck } from "lucide-react";
import React from "react";

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="text-blue-600" size={32} />
            </div>
            <h4 className="text-xl font-semibold mb-2">Free Shipping</h4>
            <p className="text-gray-600">Free shipping on orders over $50</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-green-600" size={32} />
            </div>
            <h4 className="text-xl font-semibold mb-2">Secure Payment</h4>
            <p className="text-gray-600">Your payment information is secure</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="text-purple-600" size={32} />
            </div>
            <h4 className="text-xl font-semibold mb-2">Easy Returns</h4>
            <p className="text-gray-600">30-day return policy</p>
          </div>
        </div>
      </div>
    </section>
  );
}
