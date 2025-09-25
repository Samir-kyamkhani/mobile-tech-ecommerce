import React from "react";
import {
  Truck,
  Timer,
  DollarSign,
  Globe,
  Map,
  Home,
  AlertTriangle,
  Undo2,
  Mail,
} from "lucide-react"; // Icons import kiye gaye

// Section Title ke liye ek reusable component
const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center mt-8 mb-4 border-b pb-2">
    {React.cloneElement(icon, {
      className: "w-6 h-6 mr-3 text-blue-600 flex-shrink-0",
    })}
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

export default function ShippingPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen" id="4">
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 pb-2">
            Shipping Policy
          </h1>
          <p className="text-lg text-gray-500">
            SHIV DHARATI COMMUNICATION PRIVATE LIMITED
          </p>
        </header>

        <main className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <Paragraph>
            We want to make sure your order gets to you as quickly and smoothly
            as possible! Here’s what you need to know about our shipping
            process.
          </Paragraph>

          <section>
            <SectionTitle icon={<Timer />} title="1. Processing Time" />
            <ul>
              <ListItem>We process orders within 1-3 business days.</ListItem>
              <ListItem>
                If you order on a weekend or holiday, we’ll start processing it
                on the next business day.
              </ListItem>
            </ul>
          </section>

          <section>
            <SectionTitle
              icon={<Truck />}
              title="2. Shipping Options & Delivery Times"
            />
            <ul>
              <ListItem>
                <strong>Standard Shipping:</strong> Delivered within 3 to 5
                working days.
              </ListItem>
              <ListItem>
                Keep in mind that delivery times may vary due to location,
                carrier delays, or unexpected events.
              </ListItem>
            </ul>
          </section>

          <section>
            <SectionTitle icon={<DollarSign />} title="3. Shipping Costs" />
            <ul>
              <ListItem>
                Shipping rates are calculated at checkout based on your location
                and chosen shipping method.
              </ListItem>
              <ListItem>
                We may offer free shipping for orders over a certain amount
                (check our website for details!).
              </ListItem>
            </ul>
          </section>

          <section>
            <SectionTitle icon={<Globe />} title="4. International Shipping" />
            <ul>
              <ListItem>
                We do ship internationally to select countries.
              </ListItem>
              <ListItem>
                Any customs duties, taxes, or import fees are the customer’s
                responsibility.
              </ListItem>
              <ListItem>
                International shipping times may be longer due to customs
                processing.
              </ListItem>
            </ul>
          </section>

          <section>
            <SectionTitle icon={<Map />} title="5. Tracking Your Order" />
            <ul>
              <ListItem>
                Once your order ships, we’ll email you a tracking .
              </ListItem>
              <ListItem>
                You can use this number to check your order’s status in real
                time.
              </ListItem>
            </ul>
          </section>

          <section>
            <SectionTitle
              icon={<Home />}
              title="6. Double-Check Your Address"
            />
            <Paragraph>
              Please make sure your shipping address is correct before placing
              your order. We can’t be responsible for orders sent to the wrong
              address if it was entered incorrectly.
            </Paragraph>
          </section>

          <section>
            <SectionTitle
              icon={<AlertTriangle />}
              title="7. Delays or Lost Packages"
            />
            <ul>
              <ListItem>
                If your package is delayed, reach out to our customer support
                team—we’ll look into it for you.
              </ListItem>
              <ListItem>
                If a package gets lost, we’ll investigate and may offer a
                replacement or refund, depending on the situation.
              </ListItem>
            </ul>
          </section>

          <section>
            <SectionTitle
              icon={<Undo2 />}
              title="8. Returns Due to Non-Delivery"
            />
            <Paragraph>
              If a package is returned to us because of an incorrect address or
              refusal to accept delivery, you may need to pay for reshipping.
            </Paragraph>
          </section>

          <Paragraph>
            If you have any questions, feel free to reach out to our support
            team at{" "}
            <a
              href="shivdharaticommunication@gmail.com"
              className="text-blue-600 font-semibold hover:underline"
            >
              shivdharaticommunication@gmail.com
            </a>
            . We’re happy to help!
          </Paragraph>
        </main>
      </div>
    </div>
  );
}
