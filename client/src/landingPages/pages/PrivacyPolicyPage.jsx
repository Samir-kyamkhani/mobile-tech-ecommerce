import React from "react";
import {
  Database,
  Cog,
  Share2,
  Shield,
  Archive,
  UserCheck,
  Cookie,
  Link as LinkIcon,
  PersonStanding,
  FilePenLine,
  Phone,
} from "lucide-react";

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

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen" id="3">
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 pb-2">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-500">
            SHIV DHARATI COMMUNICATION PRIVATE LIMITED
          </p>
        </header>

        <main className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <Paragraph>
            SHIV DHARATI COMMUNICATION PRIVATE LIMITED ("we," "our," or "us") is
            committed to protecting your privacy and ensuring the security of
            your personal information. This Privacy Policy outlines how we
            collect, use, and safeguard your data when you visit our e-commerce
            website and make purchases through our platform. By using our
            website, you agree to the collection and use of information in
            accordance with this Privacy Policy.
          </Paragraph>

          <section>
            <SectionTitle
              icon={<Database />}
              title="1. Information We Collect"
            />
            <Paragraph>
              We collect various types of information to facilitate your
              shopping experience:
            </Paragraph>
            <ul>
              <ListItem>
                <strong>Personal Information:</strong> Name, email address,
                shipping address, phone number, and payment details.
              </ListItem>
              <ListItem>
                <strong>Order Information:</strong> Details related to your
                purchases, order history, and shipping preferences.
              </ListItem>
              <ListItem>
                <strong>Technical & Usage Data:</strong> IP addresses, device
                type, browser information, and how you interact with our
                website.
              </ListItem>
              <ListItem>
                <strong>Cookies:</strong> We use cookies to remember your
                preferences and track your shopping cart.
              </ListItem>
            </ul>
          </section>

          <section>
            <SectionTitle
              icon={<Cog />}
              title="2. How We Use Your Information"
            />
            <Paragraph>
              We use the information collected for various purposes, including:
            </Paragraph>
            <ul>
              <ListItem>
                To process and fulfill your orders and manage shipping.
              </ListItem>
              <ListItem>
                To enhance our website’s functionality and personalize your
                experience.
              </ListItem>
              <ListItem>
                To provide customer support and respond to inquiries.
              </ListItem>
              <ListItem>
                With your consent, to send promotional offers and updates.
              </ListItem>
              <ListItem>To detect and prevent fraudulent activities.</ListItem>
            </ul>
          </section>

          <section>
            <SectionTitle
              icon={<Share2 />}
              title="3. Sharing Your Information"
            />
            <Paragraph>
              We only share your information with third parties in the following
              situations:
            </Paragraph>
            <ul>
              <ListItem>
                <strong>Service Providers:</strong> With vendors who assist in
                operating our platform, processing payments, and fulfilling
                orders.
              </ListItem>
              <ListItem>
                <strong>Legal Compliance:</strong> If required by law or to
                enforce our Terms of Service.
              </ListItem>
              <ListItem>
                <strong>Business Transactions:</strong> In the event of a merger
                or acquisition, your information may be transferred.
              </ListItem>
            </ul>
          </section>

          <section>
            <SectionTitle icon={<Shield />} title="4. Data Security" />
            <Paragraph>
              We implement industry-standard security measures to protect your
              personal and payment information from unauthorized access,
              alteration, or disclosure. While we strive to safeguard your data,
              no method of transmission over the Internet is 100% secure.
            </Paragraph>
          </section>

          <section>
            <SectionTitle icon={<Archive />} title="5. Data Retention" />
            <Paragraph>
              We retain your information only for as long as necessary to
              fulfill the purposes for which it was collected or as required by
              law. When no longer needed, we will securely delete or anonymize
              it.
            </Paragraph>
          </section>

          <section>
            <SectionTitle icon={<UserCheck />} title="6. Your Rights" />
            <Paragraph>
              You may have the right to access, correct, delete, or object to
              the processing of your personal data. To exercise these rights,
              please contact us.
            </Paragraph>
          </section>

          <section>
            <SectionTitle icon={<Cookie />} title="7. Cookies" />
            <Paragraph>
              We use cookies to enhance your shopping experience. You can manage
              your cookie preferences through your browser settings, but
              disabling them may affect website functionality.
            </Paragraph>
          </section>

          <section>
            <SectionTitle icon={<LinkIcon />} title="8. Third-Party Links" />
            <Paragraph>
              Our website may contain links to third-party sites. We are not
              responsible for their privacy practices. Please review their
              policies before sharing personal information.
            </Paragraph>
          </section>

          <section>
            <SectionTitle
              icon={<PersonStanding />}
              title="9. Children's Privacy"
            />
            <Paragraph>
              Our website is not intended for individuals under the age of 18.
              We do not knowingly collect personal data from children.
            </Paragraph>
          </section>

          <section>
            <SectionTitle
              icon={<FilePenLine />}
              title="10. Changes to This Policy"
            />
            <Paragraph>
              We may update this Privacy Policy periodically. Any updates will
              be posted on this page with an effective date.
            </Paragraph>
          </section>

          <section>
            <SectionTitle icon={<Phone />} title="11. Contact Us" />
            <Paragraph>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
            </Paragraph>
            <address className="not-italic text-gray-700">
              SHIV DHARATI COMMUNICATION PRIVATE LIMITED
              <br />
              T/6, D Con Complex
              <br />
              Dharma Cinema Road, Opp. B K Cinema
              <br />
              Sukheshwar Nagar, Mahesana, Gujarat – 384002
              <br />
              <strong>Phone:</strong>{" "}
              <a href="tel:+919089891000" className="hover:text-blue-600">
                (+91) 9089891000
              </a>
            </address>
          </section>
        </main>
      </div>
    </div>
  );
}
