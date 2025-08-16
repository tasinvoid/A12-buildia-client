import React from "react";
import { motion } from "framer-motion";

import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import BuildiaLogo from "../BuildiaLogo";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.footer
      className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-12"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-700 dark:border-gray-800 pb-8 mb-8">
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <span className="flex items-center justify-center">
              <BuildiaLogo></BuildiaLogo>{" "}
             
            </span>

            <p className="text-sm leading-relaxed">
              Buildia Towers offers modern, luxurious apartments in prime
              locations, designed for your comfort and sophisticated urban
              living. Your dream home awaits.
            </p>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-blue-500 transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#apartments"
                  className="hover:text-blue-500 transition duration-300"
                >
                  Apartments
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-blue-500 transition duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-500 transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Us Section */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:+880123456789"
                  className="hover:text-blue-500 transition duration-300 flex items-center"
                >
                  <MdPhone className="w-5 h-5 mr-2" /> {/* React Icon */}
                  +880 123 456 789
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@buildiatowers.com"
                  className="hover:text-blue-500 transition duration-300 flex items-center"
                >
                  <MdEmail className="w-5 h-5 mr-2" /> {/* React Icon */}
                  info@buildiatowers.com
                </a>
              </li>
              <li className="flex items-start">
                <MdLocationOn className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />{" "}
                {/* React Icon */}
                <address className="not-italic">
                  123/A, Green Road, Dhanmondi,
                  <br />
                  Dhaka 1205, Bangladesh
                </address>
              </li>
            </ul>
          </motion.div>

          {/* Social Media Section */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/buildiatowers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition duration-300"
              >
                <FaFacebook className="w-8 h-8" /> {/* React Icon */}
              </a>
              <a
                href="https://twitter.com/buildiatowers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition duration-300"
              >
                <FaTwitter className="w-8 h-8" /> {/* React Icon */}
              </a>
              <a
                href="https://linkedin.com/company/buildiatowers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-700 transition duration-300"
              >
                <FaLinkedin className="w-8 h-8" /> {/* React Icon */}
              </a>
              <a
                href="https://instagram.com/buildiatowers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition duration-300"
              >
                <FaInstagram className="w-8 h-8" /> {/* React Icon */}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          className="text-center text-sm text-gray-500 dark:text-gray-600 pt-8 border-t border-gray-800 dark:border-gray-700 mt-8"
          variants={itemVariants}
        >
          &copy; {new Date().getFullYear()} Buildia Towers. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
