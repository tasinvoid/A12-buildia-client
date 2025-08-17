import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import 'aos/dist/aos.css';
import AOS from 'aos';

// Mock data for the facilities
const facilities = [
  {
    name: '24/7 Concierge',
    description: 'Our dedicated team is always on hand to assist with your needs, from package handling to booking services.',
    icon: (
      <svg className="w-12 h-12 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    name: 'Rooftop Terrace',
    description: 'Relax and unwind with stunning city views from our beautifully landscaped rooftop terrace, complete with seating and a fire pit.',
    icon: (
      <svg className="w-12 h-12 text-pink-400 group-hover:text-pink-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Co-working Space',
    description: 'Boost your productivity in our modern co-working lounge, featuring high-speed Wi-Fi, private desks, and meeting rooms.',
    icon: (
      <svg className="w-12 h-12 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-1.252-8.408-3.5a1.53 1.53 0 01-.284-1.636l.006-.012c.319-.646.999-.968 1.636-.649.637.319.957 1.001.637 1.648l-.006.012a9.052 9.052 0 004.996 5.253A9.052 9.052 0 0012 19a9.052 9.052 0 004.996-1.554.492.492 0 01.637.649c-.319.646-1.001.968-1.648.637zM12 12a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
  },
  {
    name: 'Fitness Center',
    description: 'Stay healthy and active with our state-of-the-art fitness center, equipped with modern cardio and weight training machines.',
    icon: (
      <svg className="w-12 h-12 text-pink-400 group-hover:text-pink-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-5 10A2 2 0 0114 22H4a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      </svg>
    ),
  },
];

// Framer Motion variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Facilities = () => {
  useEffect(() => {
    // Initialize AOS with a specific duration for a smooth effect
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-xl p-8 my-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-100">
          Our Premium Facilities
        </h2>
        <p className="mt-4 text-gray-400 text-lg">
          Enhance your living experience with our state-of-the-art amenities.
        </p>
      </div>

      {/* Grid of facility cards with Framer Motion and AOS */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {facilities.map((facility, index) => (
          <motion.div
            key={index}
            className="group relative flex flex-col items-center text-center p-6 rounded-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300 overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={index * 150}
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gray-900 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-4">
                {facility.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-100 group-hover:text-indigo-400 transition-colors duration-300">
                {facility.name}
              </h3>
              <p className="mt-2 text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                {facility.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Facilities;