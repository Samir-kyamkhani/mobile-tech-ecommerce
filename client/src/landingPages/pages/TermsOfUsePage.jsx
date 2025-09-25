import React from "react";
import {
  FileText,
  User,
  CreditCard,
  Truck,
  RefreshCw,
  Copyright,
  ShieldAlert,
  ShieldCheck,
  FilePenLine,
  Landmark,
  CheckSquare,
  Globe,
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

export default function TermsOfUsePage() {
  return (
    <div className="bg-gray-50 min-h-screen" id="2">
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 pb-2">
            Terms Of Use
          </h1>
          <p className="text-lg text-gray-500">
            SHIV DHARATI COMMUNICATION PRIVATE LIMITED
          </p>
        </header>

        <main className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <Paragraph>
            Welcome to SHIV DHARATI COMMUNICATION PRIVATE LIMITED ("we," "us,"
            "our"). By accessing or using our e-commerce platform, you agree to
            comply with these Terms of Use. Please review these terms carefully.
          </Paragraph>

          <section>
            <SectionTitle
              icon={<CheckSquare />}
              title="1. Acceptance of Terms"
            />
            <Paragraph>
              By accessing or using our platform, you agree to be bound by these
              Terms of Use and all applicable laws. If you do not agree to these
              terms, please discontinue using our platform.
            </Paragraph>
          </section>

          <section>
            <SectionTitle icon={<Globe />} title="2. Use of the Platform" />
            <Paragraph>
              You agree to use our platform only for lawful purposes and in a
              manner that does not infringe upon the rights of, restrict, or
              inhibit any other user’s experience on the platform.
            </Paragraph>
          </section>

          <section>
            <SectionTitle icon={<User />} title="3. User Accounts" />
            <Paragraph>
              To access certain features of our platform, you may need to create
              an account. You are responsible for maintaining the
              confidentiality of your account credentials and for any activity
              conducted under your account.
            </Paragraph>
          </section>

          <section>
            <SectionTitle
              icon={<CreditCard />}
              title="4. Purchases and Payments"
            />
            <Paragraph>
              By purchasing items on our platform, you agree to provide accurate
              and complete payment information. We reserve the right to refuse
              or cancel any order at our discretion. Prices, product
              descriptions, and availability are subject to change without
              notice.
            </Paragraph>
          </section>

          <section>
            <SectionTitle icon={<Truck />} title="5. Shipping and Delivery" />
            <Paragraph>
              Shipping times and costs may vary based on location and product
              selection. SHIV DHARATI COMMUNICATION PRIVATE LIMITED is not
              liable for any delays due to unforeseen events beyond our control,
              including but not limited to, weather conditions, customs delays,
              or carrier issues.
            </Paragraph>
          </section>

          <section>
            <SectionTitle icon={<RefreshCw />} title="6. Returns and Refunds" />
            <Paragraph>
              Our return and refund policies are outlined separately on our
              platform. Please refer to the "Returns & Refunds" section for full
              details on eligibility and procedures for returning items and
              receiving refunds.
            </Paragraph>
          </section>

          <section>
            <SectionTitle
              icon={<Copyright />}
              title="7. Intellectual Property"
            />
            <Paragraph>
              All content on our platform, including text, graphics, logos,
              images, and software, is the property of SHIV DHARATI
              COMMUNICATION PRIVATE LIMITED and is protected by intellectual
              property laws. Unauthorized use of any content is strictly
              prohibited.
            </Paragraph>
          </section>

          <section>
            <SectionTitle
              icon={<ShieldAlert />}
              title="8. Limitation of Liability"
            />
            <Paragraph>
              To the fullest extent permitted by law, SHIV DHARATI COMMUNICATION
              PRIVATE LIMITED shall not be liable for any direct, indirect,
              incidental, or consequential damages resulting from your use or
              inability to use our platform.
            </Paragraph>
          </section>

          <section>
            <SectionTitle icon={<ShieldCheck />} title="9. Indemnification" />
            <Paragraph>
              You agree to indemnify and hold harmless SHIV DHARATI
              COMMUNICATION PRIVATE LIMITED, its affiliates, employees, and
              agents from any claims, liabilities, damages, or expenses arising
              from your use of our platform or breach of these Terms.
            </Paragraph>
          </section>

          <section>
            <SectionTitle icon={<FilePenLine />} title="10. Changes to Terms" />
            <Paragraph>
              SHIV DHARATI COMMUNICATION PRIVATE LIMITED reserves the right to
              modify these Terms of Use at any time. Any changes will take
              effect immediately upon being posted on our platform. Continued
              use of our platform following any modifications constitutes
              acceptance of the revised terms.
            </Paragraph>
          </section>

          <section>
            <SectionTitle icon={<Landmark />} title="11. Governing Law" />
            <Paragraph>
              These Terms of Use are governed by the laws of India. Any disputes
              arising from these terms shall be subject to the exclusive
              jurisdiction of the courts in Jaipur, Rajasthan, India.
            </Paragraph>
          </section>
        </main>
      </div>
    </div>
  );
}
