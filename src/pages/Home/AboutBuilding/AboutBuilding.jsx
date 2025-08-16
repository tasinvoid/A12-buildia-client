import React from 'react';
import { motion } from 'framer-motion';
import buildingAboutImg from '../../../assets/pexels-expect-best-79873-323705.jpg';

const AboutBuilding = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  const featureItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        duration: 0.5
      }
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          className="lg:w-1/2 w-full relative"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={buildingAboutImg}
            alt="Modern Building Exterior"
            className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500 ease-in-out w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 rounded-xl"></div>
          <div className="absolute bottom-6 left-6 text-white text-3xl font-bold">
            Buildia Towers
          </div>
        </motion.div>

        <motion.div
          className="lg:w-1/2 w-full text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h3
            className="text-5xl font-extrabold text-gray-100 mb-6 leading-tight"
            variants={itemVariants}
          >
            Where <span className="text-blue-600">Luxury</span> Meets <span className="text-green-600">Lifestyle</span>
          </motion.h3>
          <motion.p
            className="text-lg text-gray-400 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Built with meticulous attention to detail and designed for the modern urban dweller, **Buildia Towers** stands as a beacon of contemporary architecture and sophisticated living. Our commitment is to provide an unparalleled residential experience, blending comfort, convenience, and cutting-edge amenities.
          </motion.p>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" variants={containerVariants}>
            <motion.div className="flex items-start text-left" variants={featureItemVariants}>
              <svg className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
              <div>
                <h4 className="text-xl font-semibold text-gray-300">Prime Location</h4>
                <p className="text-gray-600">Strategically located for easy access to city essentials and vibrant urban hubs.</p>
              </div>
            </motion.div>
            <motion.div className="flex items-start text-left" variants={featureItemVariants}>
              <svg className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
              <div>
                <h4 className="text-xl font-semibold text-gray-300">State-of-the-Art Security</h4>
                <p className="text-gray-600">24/7 surveillance and smart access systems ensure your peace of mind.</p>
              </div>
            </motion.div>
            <motion.div className="flex items-start text-left" variants={featureItemVariants}>
              <svg className="w-8 h-8 text-purple-500 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
              <div>
                <h4 className="text-xl font-semibold text-gray-300">Panoramic Views</h4>
                <p className="text-gray-600">Enjoy breathtaking cityscapes and serene natural vistas from your home.</p>
              </div>
            </motion.div>
            <motion.div className="flex items-start text-left" variants={featureItemVariants}>
              <svg className="w-8 h-8 text-red-500 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10l2 2v8a2 2 0 002 2h2v-2h-2V6a2 2 0 00-2-2H4zm6 9a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd"></path></svg>
              <div>
                <h4 className="text-xl font-semibold text-gray-300">Smart Home Integration</h4>
                <p className="text-gray-600">Control lighting, climate, and security with a tap on your device.</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.a
            href="#explore"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
            variants={itemVariants}
          >
            Explore Our Apartments
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBuilding;