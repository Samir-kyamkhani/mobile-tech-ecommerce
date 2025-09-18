import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, FileText, RotateCcw, Truck, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

const PolicyPages = () => {
  const [activePage, setActivePage] = useState('privacy');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const policies = [
    { id: 'privacy', title: 'Privacy Policy', icon: Shield },
    { id: 'terms', title: 'Terms & Conditions', icon: FileText },
    { id: 'refund', title: 'Refund & Return Policy', icon: RotateCcw },
    // { id: 'shipping', title: 'Shipping Policy', icon: Truck }
  ];

  const PrivacyPolicy = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-blue-100">Last updated: September 16, 2025</p>
      </div>

      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Information We Collect</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Name, email address, and phone number</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information (processed securely)</li>
              <li>Account credentials and preferences</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">How We Use Your Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">Service Delivery</h3>
              <p className="text-gray-700">Process orders, manage accounts, and provide customer support.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-800">Communication</h3>
              <p className="text-gray-700">Send order updates, promotional offers, and important notices.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement industry-standard security measures to protect your personal information, including SSL encryption, 
            secure payment processing, and regular security audits.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Rights</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <p className="text-gray-700">
              You have the right to access, update, or delete your personal information. Contact our support team 
              for assistance with any privacy-related requests.
            </p>
          </div>
        </section>
      </div>
    </div>
  );

  const TermsConditions = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-indigo-100">Effective from: September 16, 2025</p>
      </div>

      <div className="space-y-6">
        {[
          {
            title: "Acceptance of Terms",
            content: "By accessing and using Shiv Dharati Ltd.'s website and services, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you must not use our services."
          },
          {
            title: "Product Information",
            content: "We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free."
          },
          {
            title: "Order Acceptance",
            content: "All orders are subject to acceptance by Shiv Dharati Ltd.. We reserve the right to refuse or cancel any order for any reason, including product availability, errors in pricing or product information."
          },
          {
            title: "User Accounts",
            content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use."
          },
          {
            title: "Prohibited Uses",
            content: "You may not use our services for any unlawful purpose, to violate intellectual property rights, or to transmit harmful or offensive content. We reserve the right to terminate accounts that violate these terms."
          },
          {
            title: "Limitation of Liability",
            content: "Shiv Dharati Ltd. shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or products, even if we have been advised of the possibility of such damages."
          }
        ].map((section, index) => (
          <div key={index} className="border rounded-lg">
            <button
              onClick={() => toggleSection(`terms-${index}`)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
            >
              <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
              {expandedSections[`terms-${index}`] ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections[`terms-${index}`] && (
              <div className="px-6 pb-4">
                <p className="text-gray-700">{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const RefundPolicy = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Refund & Return Policy</h1>
        <p className="text-green-100">Your satisfaction is our priority</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 mb-4">Return Eligibility</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></div>
                <span className="text-gray-700">Items must be returned within 30 days of delivery</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></div>
                <span className="text-gray-700">Products must be in original packaging</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></div>
                <span className="text-gray-700">Items must be unused and undamaged</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Return Process</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                <span className="text-gray-700">Contact customer support</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                <span className="text-gray-700">Receive return authorization</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                <span className="text-gray-700">Pack and ship the item</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">Refund Timeline</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-700">Processing Time</span>
                <span className="font-semibold text-yellow-800">3-5 business days</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-700">Credit Card Refund</span>
                <span className="font-semibold text-yellow-800">5-7 business days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Bank Transfer</span>
                <span className="font-semibold text-yellow-800">7-10 business days</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-red-800 mb-4">Non-Returnable Items</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Customized or personalized products</li>
              <li>• Software or digital downloads</li>
              <li>• Items damaged by misuse</li>
              <li>• Products without original packaging</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // const ShippingPolicy = () => (
  //   <div className="space-y-8">
  //     <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg">
  //       <h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>
  //       <p className="text-purple-100">Fast, reliable delivery across India</p>
  //     </div>

  //     <div className="grid lg:grid-cols-3 gap-8">
  //       <div className="lg:col-span-2 space-y-6">
  //         <div className="bg-white border rounded-lg overflow-hidden">
  //           <h3 className="text-xl font-bold p-6 bg-gray-50 border-b">Shipping Options</h3>
  //           <div className="p-6">
  //             <div className="space-y-4">
  //               <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
  //                 <div>
  //                   <h4 className="font-semibold text-blue-800">Standard Delivery</h4>
  //                   <p className="text-sm text-gray-600">5-7 business days</p>
  //                 </div>
  //                 <span className="text-blue-600 font-bold">₹99</span>
  //               </div>
  //               <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
  //                 <div>
  //                   <h4 className="font-semibold text-green-800">Express Delivery</h4>
  //                   <p className="text-sm text-gray-600">2-3 business days</p>
  //                 </div>
  //                 <span className="text-green-600 font-bold">₹199</span>
  //               </div>
  //               <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
  //                 <div>
  //                   <h4 className="font-semibold text-purple-800">Same Day Delivery</h4>
  //                   <p className="text-sm text-gray-600">Within major cities</p>
  //                 </div>
  //                 <span className="text-purple-600 font-bold">₹299</span>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="bg-white border rounded-lg overflow-hidden">
  //           <h3 className="text-xl font-bold p-6 bg-gray-50 border-b">Order Processing</h3>
  //           <div className="p-6">
  //             <div className="space-y-4">
  //               <div className="flex items-start">
  //                 <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 mr-4"></div>
  //                 <div>
  //                   <h4 className="font-semibold">Order Confirmation</h4>
  //                   <p className="text-gray-600 text-sm">Orders are processed within 24 hours of confirmation</p>
  //                 </div>
  //               </div>
  //               <div className="flex items-start">
  //                 <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 mr-4"></div>
  //                 <div>
  //                   <h4 className="font-semibold">Quality Check</h4>
  //                   <p className="text-gray-600 text-sm">All products undergo quality inspection before dispatch</p>
  //                 </div>
  //               </div>
  //               <div className="flex items-start">
  //                 <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 mr-4"></div>
  //                 <div>
  //                   <h4 className="font-semibold">Dispatch Notification</h4>
  //                   <p className="text-gray-600 text-sm">Tracking details sent via SMS and email</p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="space-y-6">
  //         <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 rounded-lg">
  //           <h3 className="text-xl font-bold mb-4">Free Shipping</h3>
  //           <p className="mb-4">On orders above ₹999</p>
  //           <div className="bg-white bg-opacity-20 p-3 rounded">
  //             <p className="text-sm">Save on shipping costs with minimum order value</p>
  //           </div>
  //         </div>

  //         <div className="bg-white border rounded-lg p-6">
  //           <h3 className="text-lg font-bold mb-4">Delivery Areas</h3>
  //           <div className="space-y-3">
  //             <div className="flex justify-between items-center">
  //               <span className="text-gray-700">Major Cities</span>
  //               <span className="text-green-600 text-sm">✓ Available</span>
  //             </div>
  //             <div className="flex justify-between items-center">
  //               <span className="text-gray-700">Tier 2 Cities</span>
  //               <span className="text-green-600 text-sm">✓ Available</span>
  //             </div>
  //             <div className="flex justify-between items-center">
  //               <span className="text-gray-700">Rural Areas</span>
  //               <span className="text-yellow-600 text-sm">⚠ Limited</span>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="bg-gray-50 border rounded-lg p-6">
  //           <h3 className="text-lg font-bold mb-4">Track Your Order</h3>
  //           <p className="text-gray-600 text-sm mb-4">
  //             Get real-time updates on your order status through our tracking system.
  //           </p>
  //           <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
  //             Track Order
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  const renderActivePage = () => {
    switch (activePage) {
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <TermsConditions />;
      case 'refund': return <RefundPolicy />;
      // case 'shipping': return <ShippingPolicy />;
      default: return <PrivacyPolicy />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="mr-4 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="text-xl font-bold text-blue-600">Shiv Dharati Ltd.</div> */}
            {/* </div> */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-1" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-1" />
                <span>support@Shiv Dharati Ltd..com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Legal Information</h2>
              <nav className="space-y-2">
                {policies.map(({ id, title, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActivePage(id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activePage === id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {renderActivePage()}
            </div>
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default PolicyPages;