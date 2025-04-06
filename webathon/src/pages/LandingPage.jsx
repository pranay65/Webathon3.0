import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disclosure, Transition } from "@headlessui/react";
import {
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiGithub,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaUserCircle,
  FaRobot,
  FaStar,
  FaVideo,
  FaFileContract,
  FaLock,
  FaMedal,
  FaAngleDown,
  FaQuoteLeft,
} from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <FaRobot className="w-10 h-10" />,
      title: "AI-Powered Matching",
      description:
        "Smart algorithms to connect you with the perfect opportunities",
      link: "joblisting",
    },
    {
      icon: <FaStar className="w-10 h-10" />,
      title: "Trust & Rating System",
      description:
        "Transparent feedback and rating system for quality assurance",
    },
    {
      icon: <FaVideo className="w-10 h-10" />,
      title: "Real-Time Communication",
      description: "Seamless chat & video tools for better collaboration",
    },
    {
      icon: <FaFileContract className="w-10 h-10" />,
      title: "Secure Digital Contracts",
      description: "Legally binding contracts with electronic signatures",
    },
    {
      icon: <FaLock className="w-10 h-10" />,
      title: "Escrow Payment System",
      description: "Safe and secure payment processing",
    },
    {
      icon: <FaMedal className="w-10 h-10" />,
      title: "Skill Verification",
      description: "Verified skills and achievements recognition",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "FreelanceHub transformed my career. The AI matching system consistently connects me with ideal clients.",
    },
    {
      name: "Michael Chen",
      role: "Full Stack Developer",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "The secure payment system and project tools make it easy to focus on what matters - the work.",
    },
    {
      name: "Emma Williams",
      role: "Content Writer",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      text: "As a writer, I love how FreelanceHub verifies skills and maintains high quality standards. It's a game-changer!",
    },
  ];

  const faqs = [
    {
      question: "How does the payment protection work?",
      answer:
        "Our escrow system holds payment until project milestones are completed and approved, ensuring security for both parties.",
    },
    {
      question: "What are the platform fees?",
      answer:
        "We charge a competitive 5% fee on completed projects, with no hidden costs or monthly subscriptions.",
    },
    {
      question: "How is freelancer quality maintained?",
      answer:
        "Through our comprehensive verification process, skill assessments, and continuous rating system.",
    },
    {
      question: "Can I hire teams for larger projects?",
      answer:
        "Yes, FreelanceHub supports both individual freelancers and team collaboration for complex projects.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="font-['Inter'] text-gray-800 overflow-x-hidden">
      <Navbar />

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3949AB] via-[#5C6BC0] to-[#42A5F5] opacity-90">
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  width: Math.random() * 20 + 5,
                  height: Math.random() * 20 + 5,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  y: [null, Math.random() * -100, null],
                  opacity: [null, Math.random() * 0.5 + 0.5, null],
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-6 py-20 flex items-center min-h-screen">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Connect with Top Freelancers
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  In an Instant
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl mb-12 text-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                A smarter way to hire or get hired in the digital economy
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link to="/search">
                  <motion.button
                    className="flex items-center justify-center gap-2 bg-white text-[#5C6BC0] px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 hover:shadow-lg transition group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Find Freelancers
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link to="/postjob">
                  <motion.button
                    className="flex items-center justify-center gap-2 border-2 border-white bg-transparent px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#5C6BC0] transition group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Freelancing
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L48 110C96 100 192 80 288 75C384 70 480 80 576 85C672 90 768 90 864 90C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
              fill="white"
            />
          </svg>
        </motion.div>
      </section>

      {/* Why FreelanceHub Section - Enhanced with better typography + spacing */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-[#5C6BC0] font-semibold text-lg mb-2 block">
              Our Mission
            </span>
            <h2 className="text-4xl font-bold mb-10">Why FreelanceHub?</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              The traditional freelance marketplace is plagued with unreliable
              payments, poor job matches, and lack of quality control. These
              issues create frustration for both clients and freelancers.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              FreelanceHub revolutionizes freelancing with AI-powered matching,
              secure payment protection, and comprehensive project management
              tools. Our platform ensures quality, security, and efficiency for
              everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Enhanced with interactive cards and better scaling */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute opacity-5 -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
        <div className="absolute opacity-5 -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <span className="text-[#5C6BC0] font-semibold text-lg mb-2 block">
              What We Offer
            </span>
            <h2 className="text-4xl font-bold">Platform Features</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-[#5C6BC0]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section - Enhanced with better layout and visual cues */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-[#5C6BC0] font-semibold text-lg mb-2 block">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold">How It Works</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-8 text-[#5C6BC0] flex items-center">
                <span className="bg-[#5C6BC0] text-white p-2 rounded-lg mr-3">
                  <FaUserCircle />
                </span>
                For Freelancers
              </h3>
              <div className="space-y-6">
                {[
                  "Sign up and create your account",
                  "Complete your professional profile",
                  "Get matched with relevant projects",
                  "Complete work and get paid securely",
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-[#5C6BC0] text-white rounded-full flex items-center justify-center shadow-md">
                      {idx + 1}
                    </div>
                    <p className="text-lg">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-8 text-[#42A5F5] flex items-center">
                <span className="bg-[#42A5F5] text-white p-2 rounded-lg mr-3">
                  <FaFileContract />
                </span>
                For Clients
              </h3>
              <div className="space-y-6">
                {[
                  "Post your project requirements",
                  "Get matched with qualified freelancers",
                  "Collaborate and track progress",
                  "Review and pay through secure escrow",
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-[#42A5F5] text-white rounded-full flex items-center justify-center shadow-md">
                      {idx + 1}
                    </div>
                    <p className="text-lg">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Completely redesigned with carousel */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="smallGrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-[#5C6BC0] font-semibold text-lg mb-2 block">
              Success Stories
            </span>
            <h2 className="text-4xl font-bold">What Our Users Say</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div className="relative rounded-2xl bg-white p-8 shadow-xl overflow-hidden">
              <div className="absolute text-gray-100 top-4 left-4 opacity-20">
                <FaQuoteLeft className="w-16 h-16" />
              </div>

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-[200px]"
                  >
                    <div className="flex items-center mb-6">
                      <motion.img
                        src={testimonials[activeTestimonial].image}
                        alt={testimonials[activeTestimonial].name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 mr-4"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div>
                        <h4 className="font-bold text-xl">
                          {testimonials[activeTestimonial].name}
                        </h4>
                        <p className="text-[#5C6BC0]">
                          {testimonials[activeTestimonial].role}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic text-xl leading-relaxed">
                      "{testimonials[activeTestimonial].text}"
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === idx
                        ? "bg-[#5C6BC0] w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced with better animations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-[#5C6BC0] font-semibold text-lg mb-2 block">
              Have Questions?
            </span>
            <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="max-w-3xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants} className="mb-5">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-6 py-5 text-left text-lg font-medium bg-gray-50 rounded-xl hover:bg-blue-50 focus:outline-none focus-visible:ring transition-all duration-300">
                        <span>{faq.question}</span>
                        <motion.div
                          animate={{ rotate: open ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[#5C6BC0]"
                        >
                          <FaAngleDown className="w-5 h-5" />
                        </motion.div>
                      </Disclosure.Button>

                      <Transition
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="px-6 pt-4 pb-5 text-gray-600 text-lg">
                          {faq.answer}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#3949AB] to-[#42A5F5] text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Freelance Journey?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 text-blue-100">
              Join thousands of freelancers and clients creating success stories
              every day
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#5C6BC0] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition flex items-center gap-2 mx-auto"
            >
              Get Started Today
              <FiArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer - Enhanced with better layout and visual impact */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">FreelanceHub</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Connecting talent with opportunity in the digital age. Our
                platform revolutionizes how freelancers and clients work
                together.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Contact</h4>
              <p className="text-gray-400 mb-3">
                Email: support@freelancehub.com
              </p>
              <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-[#42A5F5] transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#42A5F5] transition">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#42A5F5] transition">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Follow Us</h4>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="bg-gray-800 hover:bg-[#42A5F5] w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FiLinkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="bg-gray-800 hover:bg-[#42A5F5] w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FiTwitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="bg-gray-800 hover:bg-[#42A5F5] w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FiInstagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="bg-gray-800 hover:bg-[#42A5F5] w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FiGithub className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 FreelanceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
