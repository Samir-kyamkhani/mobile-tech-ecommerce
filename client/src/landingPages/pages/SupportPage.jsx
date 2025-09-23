import React, { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle,
  AlertCircle,
  Book,
  Video,
  FileText,
  Users,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Headphones,
} from "lucide-react";

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      id: 1,
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'My Orders' section. You'll also receive tracking information via email once your order ships. Simply click the tracking link or enter your tracking number on our tracking page.",
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in original condition with all packaging. To initiate a return, visit your account dashboard and select 'Return Item' next to your order. We'll provide a prepaid return label for your convenience.",
    },
    {
      id: 3,
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) and overnight options are also available. International shipping varies by location but generally takes 7-14 business days.",
    },
    {
      id: 4,
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. International customers are responsible for any customs duties or taxes that may apply.",
    },
    {
      id: 5,
      question: "How can I change or cancel my order?",
      answer:
        "Orders can be modified or canceled within 1 hour of placement. After this window, we begin processing your order immediately. Contact our support team as soon as possible if you need to make changes.",
    },
    {
      id: 6,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are securely processed with 256-bit SSL encryption.",
    },
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a support specialist",
      availability: "Mon-Fri 8AM-8PM EST",
      action: "Call Now",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      action: "Send Email",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "medium",
    });
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Find answers, get support, and connect with our team
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 group hover:scale-105"
                >
                  <div
                    className={`w-16 h-16 ${option.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Clock className="w-4 h-4 mr-2" />
                    {option.availability}
                  </div>
                  <button
                    className={`w-full ${option.color} ${option.hoverColor} text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]`}
                  >
                    {option.action}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16" id="faq">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-7xl  mx-auto">
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                    }
                    className="w-full text-left p-6 hover:bg-white/50 transition-colors duration-200 flex items-center justify-between"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or browse our help resources
                  below.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16" id="contact">
          <div className="max-w-7xl  mx-auto" >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 lg:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Still Need Help?
                </h2>
                <p className="text-gray-600">
                  Send us a message and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Thank you for contacting us. We'll respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="relative mb-6">
                      <input
                        type="text"
                        name="name"
                        placeholder=" "
                        value={contactForm.name}
                        onChange={handleFormChange}
                        required
                        className="peer w-full rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm px-4 pt-6 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300"
                      />
                      <label className="absolute left-4 top-2 text-gray-600 text-sm font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-blue-600 peer-focus:text-sm cursor-text">
                        Full Name
                      </label>
                    </div>

                    <div className="relative mb-6">
                      <input
                        type="email"
                        name="email"
                        placeholder=" "
                        value={contactForm.email}
                        onChange={handleFormChange}
                        required
                        className="peer w-full rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm px-4 pt-6 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300"
                      />
                      <label className="absolute left-4 top-2 text-gray-600 text-sm font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-blue-600 peer-focus:text-sm cursor-text">
                        Email Address
                      </label>
                    </div>

                    <div className="relative mb-6">
                      <input
                        type="text"
                        name="subject"
                        placeholder=" "
                        value={contactForm.subject}
                        onChange={handleFormChange}
                        required
                        className="peer w-full rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm px-4 pt-6 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300"
                      />
                      <label className="absolute left-4 top-2 text-gray-600 text-sm font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-blue-600 peer-focus:text-sm cursor-text">
                        Subject
                      </label>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level
                      </label>
                      <select
                        name="priority"
                        value={contactForm.priority}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="relative mb-6">
                      <textarea
                        name="message"
                        placeholder=" "
                        value={contactForm.message}
                        onChange={handleFormChange}
                        required
                        rows={8}
                        className="peer w-full rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm px-4 pt-6 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 resize-none"
                      />
                      <label className="absolute left-4 top-2 text-gray-600 text-sm font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-blue-600 peer-focus:text-sm cursor-text">
                        Message
                      </label>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white">
            <h2 className="text-3xl font-bold mb-8">We're Here to Help</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">&lt; 2 min</div>
                <div className="text-blue-100">Average response time</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4">
                  <Star className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Customer satisfaction</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4">
                  <Headphones className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support available</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
