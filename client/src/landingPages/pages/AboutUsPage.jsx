import { Target, Eye, ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUsPage = () => {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide cutting-edge communication solutions that connect people and businesses seamlessly across the globe.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be the leading communication service provider, transforming how people interact and businesses operate.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Our Values",
      description:
        "Integrity, innovation, and customer-centricity are at the core of everything we do.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const milestones = [
    {
      year: "2025",
      event: "Company Founded",
      description: "Started with a vision to revolutionize communication",
    },
    {
      year: "2025",
      event: "10K Customers",
      description: "Reached our first 10,000 satisfied customers",
    },
    {
      year: "2025",
      event: "National Expansion",
      description: "Expanded services across the country",
    },
    {
      year: "2025",
      event: "Global Reach",
      description: "Launched international services",
    },
    {
      year: "2025",
      event: "Innovation Leader",
      description: "Recognized as industry innovation leader",
    },
  ];

  const teamStats = [
    { number: "50+", label: "Team Members" },
    { number: "100K+", label: "Happy Customers" },
    { number: "15+", label: "Countries Served" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              About Shiv Dharati Communication
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Connecting the world through innovative communication solutions
              since 2025
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Who We Are
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Shiv Dharati Communication Pvt. Ltd. is a leading provider of
              comprehensive communication solutions, dedicated to bridging
              distances and connecting people through state-of-the-art
              technology and unparalleled service.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With years of experience and a passion for innovation, we've been
              at the forefront of the communication industry, helping businesses
              and individuals stay connected in an increasingly digital world.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 group hover:scale-105"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>

            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                      <div className="text-sm font-semibold text-blue-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {milestone.event}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Impact in Numbers
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {teamStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Shiv Dharati
              Communication for their communication needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                <Link to={"/contact-us"}>Get In Touch</Link>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
