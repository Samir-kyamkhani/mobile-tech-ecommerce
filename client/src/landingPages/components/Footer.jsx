export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid layout */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Shiv Dharati Ltd.</h3>
            <p className="text-gray-300 mb-4">
              Your trusted source for the latest mobile phones and accessories.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded"></div>
              <div className="w-8 h-8 bg-gray-700 rounded"></div>
              <div className="w-8 h-8 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Products</li>
              <li className="hover:text-white cursor-pointer">Categories</li>
              <li className="hover:text-white cursor-pointer">Deals</li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-white cursor-pointer">Shipping Info</li>
              <li className="hover:text-white cursor-pointer">Returns</li>
              <li className="hover:text-white cursor-pointer">FAQ</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest offers
            </p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg sm:rounded-l-lg sm:rounded-r-none border border-gray-700 mb-2 sm:mb-0"
              />
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-300 text-sm">
          <p>&copy; 2025 Shiv Dharati Ltd.. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
