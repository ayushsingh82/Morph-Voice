import React from 'react';
import { motion } from 'framer-motion';
import { TracingBeam } from './ui/tracing-beam';
import { TypewriterEffect } from './ui/typewriter-effect';
import Footer from './Footer';

const Home = () => {
  const words = [
    {
      text: "Create",
      className: "text-2xl md:text-4xl text-emerald-700 dark:text-emerald-500"
    },
    {
      text: "professional",
      className: "text-2xl md:text-4xl text-emerald-700 dark:text-emerald-500"
    },
    {
      text: "invoices",
      className: "text-2xl md:text-4xl text-emerald-700 dark:text-emerald-500"
    },
    {
      text: "with",
      className: "text-2xl md:text-4xl text-emerald-700 dark:text-emerald-500"
    },
    {
      text: "BNB-Voice.",
      className: "text-2xl md:text-4xl text-teal-700 dark:text-teal-500 font-bold"
    }
  ];

  return (
    <TracingBeam className="px-6">
      <div className="fixed left-0 top-0 bottom-0 w-24 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute top-1/4 left-4 w-12 h-12 bg-emerald-500/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-1/3 left-8 w-16 h-16 bg-teal-500/10 rounded-full blur-xl animate-pulse delay-300" />
          <div className="absolute top-1/2 left-2 w-20 h-20 bg-emerald-400/10 rounded-full blur-xl animate-pulse delay-500" />
          <motion.div
            animate={{
              y: [0, 100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 left-10 w-2 h-32 bg-gradient-to-b from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 rounded-full"
          />
        </motion.div>
      </div>

      <div className="fixed right-0 top-0 bottom-0 w-24 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute top-2/3 right-4 w-12 h-12 bg-emerald-500/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-1/4 right-8 w-16 h-16 bg-teal-500/10 rounded-full blur-xl animate-pulse delay-300" />
          <div className="absolute top-1/2 right-2 w-20 h-20 bg-emerald-400/10 rounded-full blur-xl animate-pulse delay-500" />
          <motion.div
            animate={{
              y: [100, 0, 100],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-10 w-2 h-32 bg-gradient-to-b from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 rounded-full"
          />
        </motion.div>
      </div>

      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="fixed left-12 top-1/4 w-32 h-32 pointer-events-none"
      >
        <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full" />
        <div className="absolute inset-2 border-2 border-emerald-500/20 rounded-full" />
        <div className="absolute inset-4 border-2 border-emerald-500/20 rounded-full" />
      </motion.div>

      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="fixed right-12 top-2/3 w-40 h-40 pointer-events-none"
      >
        <div className="absolute inset-0 border-2 border-teal-500/20 rounded-full" />
        <div className="absolute inset-2 border-2 border-teal-500/20 rounded-full" />
        <div className="absolute inset-4 border-2 border-teal-500/20 rounded-full" />
      </motion.div>

      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="mx-auto mb-10 max-w-4xl px-4">
                <TypewriterEffect words={words} />
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto font-medium px-4"
              >
                Streamline your billing process with automated invoicing, payment tracking, and financial insights.
              </motion.p>

              <motion.div
                className="flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.a
                  href="/sidebar"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-emerald-600 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-50 transition-all shadow-md hover:shadow-lg"
                >
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>

            {/* New Invoice Preview Section */}
            <section className="py-20 relative overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl" />
                  <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-12">
                    <div>
                      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Professional Invoices in Seconds
                      </h2>
                      <ul className="space-y-4">
                        {invoiceFeatures.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center gap-3 text-gray-700"
                          >
                            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-semibold">Invoice #0001</h3>
                              <p className="text-sm text-gray-500">Due in 7 days</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-2xl">$1,499.99</p>
                            <p className="text-sm text-emerald-600">Paid</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="h-2 bg-gray-100 rounded w-3/4" />
                          <div className="h-2 bg-gray-100 rounded w-1/2" />
                          <div className="h-2 bg-gray-100 rounded w-5/6" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Process Section */}
            <section className="py-20">
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                >
                  How It Works
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="relative"
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                          <svg className="w-6 h-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all border border-emerald-100"
                >
                  <div className="absolute -top-4 left-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: index * 0.2 }}
                      className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center shadow-md"
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 mt-6 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-emerald-100"
                >
                  <motion.div
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Add Footer here */}
            <Footer />
          </div>
        </section>
      </div>
    </TracingBeam>
  );
};

const invoiceFeatures = [
  "Customizable invoice templates",
  "Automatic payment reminders",
  "Multi-currency support",
  "Real-time payment tracking",
  "Secure payment processing",
  "Detailed financial reports"
];

const processSteps = [
  {
    title: "Create Invoice",
    description: "Design professional invoices with our easy-to-use templates and customization options.",
    icon: <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  },
  {
    title: "Send & Track",
    description: "Send invoices instantly and track their status in real-time with automated notifications.",
    icon: <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  },
  {
    title: "Get Paid",
    description: "Receive payments quickly through multiple payment methods with automatic reconciliation.",
    icon: <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  }
];

const features = [
  {
    title: "Smart Invoicing",
    description: "Create professional invoices in seconds with our intuitive templates and customization options.",
    icon: <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  },
  {
    title: "Automated Payments",
    description: "Accept payments online and automate your payment collection process with multiple payment options.",
    icon: <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
  },
  {
    title: "Financial Insights",
    description: "Track payments, monitor cash flow, and gain valuable insights with detailed analytics and reports.",
    icon: <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  }
];

const stats = [
  { value: "$2M+", label: "Processed Monthly" },
  { value: "10,000+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" }
];

export default Home;
