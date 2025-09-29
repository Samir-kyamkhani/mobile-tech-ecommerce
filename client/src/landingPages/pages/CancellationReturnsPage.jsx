import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Truck,
  Package,
  RefreshCw,
  CreditCard,
} from "lucide-react";

// Section Title ke liye ek reusable component
const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center mt-10 mb-4 border-b pb-2">
    {React.cloneElement(icon, { className: "w-6 h-6 mr-3 text-blue-600" })}
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
  </div>
);

// Paragraph ke liye ek reusable component
const Paragraph = ({ children }) => (
  <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
);

// List item ke liye ek reusable component
const ListItem = ({ children }) => (
  <li className="flex items-start mb-2">
    <span className="text-blue-600 mr-3 mt-1">◆</span>
    <span className="text-gray-700">{children}</span>
  </li>
);

export default function CancellationReturnsPage() {
  return (
    <div className="bg-gray-50 min-h-screen" id="1">
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 pb-2">
            ShivDharati Policies
          </h1>
          <p className="text-lg text-gray-500">
            Your guide to a seamless shopping experience.
          </p>
        </header>

        <main className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          {/* Shipping Policy Section */}
          <section>
            <SectionTitle icon={<Truck />} title="Shipping Policy" />
            <Paragraph>
              We are committed to delivering your products safely and on time,
              Pan India.
            </Paragraph>
            <ul>
              <ListItem>
                <strong>Shipping Area:</strong> We offer both Pan-India.
              </ListItem>
              <ListItem>
                <strong>Free Shipping:</strong> Enjoy free shipping on all
                domestic orders over **₹4000**. For orders below this amount, a
                standard shipping fee will be applied.
              </ListItem>
              <ListItem>
                <strong>Delivery Time:</strong> Domestic orders are typically
                delivered within 5-7 business days.
              </ListItem>
              <ListItem>
                <strong>Tracking:</strong> A tracking number will be sent to
                your email once your order is dispatched.
              </ListItem>
            </ul>
          </section>

          {/* Cancellation, Return & Refund Policy Section */}
          <section>
            <SectionTitle
              icon={<RefreshCw />}
              title="Cancellation, Return & Refund Policy"
            />
            <h3 className="font-semibold text-gray-700 mb-2 mt-4">
              Cancellation Policy:
            </h3>
            <Paragraph>
              You can cancel your order at no extra cost before it has been
              shipped. Please contact our support team immediately. Once
              shipped, an order cannot be canceled.
            </Paragraph>
            <h3 className="font-semibold text-gray-700 mb-2 mt-4">
              Return Policy:
            </h3>
            <Paragraph>
              We accept returns within 3-5 days of delivery. To be eligible,
              items must be unused, in their original condition, with all tags
              and packaging intact.
            </Paragraph>
            <h3 className="font-semibold text-gray-700 mb-2 mt-4">
              Refund Policy:
            </h3>
            <Paragraph>
              Once we receive and inspect your returned item, your refund will
              be processed. The amount will be credited to your original payment
              method within **3-5 business days**.
            </Paragraph>
          </section>

          {/* Payment Policy Section */}
          <section>
            <SectionTitle icon={<CreditCard />} title="Payment Options" />
            <Paragraph>
              Currently, we only offer **Cash on Delivery (COD)** as a payment
              option. We are actively working on integrating online payment
              gateways to provide you with more options soon.
            </Paragraph>
          </section>

          {/* Privacy Policy Section */}
          <section>
            <SectionTitle icon={<Shield />} title="Privacy Policy" />
            <Paragraph>
              Your privacy is of utmost importance to us. We collect personal
              data like your name, address, email, and phone number exclusively
              for order processing and fulfillment. We do not sell or share your
              information with third parties for marketing purposes. All data is
              securely stored and protected.
            </Paragraph>
          </section>

          {/* Terms and Conditions Section */}
          <section>
            <SectionTitle icon={<Package />} title="Terms & Conditions" />
            <Paragraph>
              By accessing and using shivdharati.com, you agree to our terms.
              All content on this website is the intellectual property of
              ShivDharati. All product prices are listed in **Indian Rupees
              (INR)**. We reserve the right to modify prices and correct any
              errors. We are not liable for any issues that arise from the
              improper use of our products.
            </Paragraph>
          </section>

          {/* Contact Us Section */}
          <section>
            <SectionTitle icon={<Phone />} title="Contact Support" />
            <Paragraph>
              For any questions, order-related queries, or assistance, please
              feel free to reach out to our dedicated support team:
            </Paragraph>
            <div className="space-y-4 mt-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-4 text-blue-600" />
                <a
                  href="tel:+919089891000"
                  className="text-gray-700 hover:text-blue-600"
                >
                  <strong>Phone Support:</strong> (+91) 9089891000
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-4 text-blue-600" />
                <a
                  href="mailto:shivdharaticommunication@gmail.com"
                  className="text-gray-700 hover:text-blue-600"
                >
                  <strong>Email Support:</strong>{" "}
                  shivdharaticommunication@gmail.com
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
