import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  Headphones,
} from "lucide-react";

const ContactUsPage = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+91 9089891000",
      description: "Mon-Fri 8AM-8PM EST",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email",
      details: "shivdharaticommunication@gmail.com",
      description: "Response within 24 hours",
      color: "from-blue-500  to-cyan-500",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "T/6, D Con Complex Dharma Cinema Road, Opp. B K Cinema",
      description: "Sukheshwar Nagar, Mahesana, Gujarat – 384002",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday: 9:00 AM - 6:00 PM",
      description: "Saturday: 10:00 AM - 4:00 PM",
      color: "from-orange-500 to-red-500",
    },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${baseUrl}/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send message.");
      }

      // Success
      setIsSubmitting(false);
      setSubmitted(true);
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Email error:", error.message);
      alert("There was an error sending your message. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 group hover:scale-105 text-center"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-800 font-semibold mb-1 break-words">
                    {info.details}
                  </p>
                  <p className="text-gray-600 text-sm break-words">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
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
                        Full Name *
                      </label>
                    </div>

                    <div className="relative">
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
                        Email Address *
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        placeholder=" "
                        value={contactForm.phone}
                        onChange={handleFormChange}
                        className="peer w-full rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm px-4 pt-6 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300"
                      />
                      <label className="absolute left-4 top-2 text-gray-600 text-sm font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-blue-600 peer-focus:text-sm cursor-text">
                        Phone Number
                      </label>
                    </div>

                    <div className="relative">
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
                        Subject *
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder=" "
                      value={contactForm.message}
                      onChange={handleFormChange}
                      required
                      rows={6}
                      className="peer w-full rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm px-4 pt-6 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 resize-none"
                    />
                    <label className="absolute left-4 top-2 text-gray-600 text-sm font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-blue-600 peer-focus:text-sm cursor-text">
                      Your Message *
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              {/* <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 h-64">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Our Location
                </h3>
                <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <MapPin className="w-8 h-8 text-gray-400" />
                  <span className="ml-2 text-gray-500">Interactive Map</span>
                </div>
              </div> */}

              {/* Quick Support */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <Headphones className="w-8 h-8 mr-3" />
                  <h3 className="text-xl font-bold">Quick Support</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  Need immediate assistance? Our support team is here to help
                  you with any questions or concerns.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-blue-100">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span>Live Chat: Available 24/7</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>Emergency: +91 9089891000-HELP</span>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Response Time
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Email Response</span>
                    <span className="font-semibold text-green-600">
                      Within 24 hours
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phone Support</span>
                    <span className="font-semibold text-green-600">
                      Immediate
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Live Chat</span>
                    <span className="font-semibold text-green-600">
                      Instant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUsPage;
