import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router"; // Use NavLink from react-router-dom
import { ThemeContext } from "../../Context/Theme/ThemeContext";

const About = () => {
  const [inView, setInView] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    const target = document.getElementById("about-section");
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setAnimatedCount((prevCount) => {
          if (prevCount < 8) {
            return prevCount + 1;
          }
          clearInterval(interval);
          return prevCount;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [inView]);

  return (
    // Base styles for light mode, dark: for dark mode overrides
    <div
      id="about-section"
      className="relative p-8 md:p-12 lg:p-16 my-8 overflow-hidden
      bg-gray-100 text-gray-800
      dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 dark:text-gray-100"
    >
      <div
        className={`relative z-10 mx-auto max-w-6xl transition-transform duration-1000 ${
          inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-md dark:text-gray-100">
            About Buildia: The Future of Property Management
          </h1>
          <p className="mt-4 text-gray-600 text-lg md:text-xl dark:text-gray-400">
            Your all-in-one platform for modern, efficient, and
            community-focused building management.
          </p>
        </div>

        {/* Card Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Our Mission Card */}
          <div className="group rounded-lg border backdrop-blur-sm p-6 transition-all duration-300 transform hover:scale-105
          bg-gray-200 border-gray-300 hover:border-indigo-500
          dark:bg-gray-800 dark:bg-opacity-80 dark:border-gray-700 dark:hover:border-indigo-500">
            <h2 className="text-2xl font-bold text-indigo-600 mb-3 group-hover:text-indigo-700 dark:text-indigo-400 dark:group-hover:text-indigo-300">
              Our Mission
            </h2>
            <p className="leading-relaxed text-gray-600 group-hover:text-gray-700 dark:text-gray-300 dark:group-hover:text-gray-200">
              To bridge the gap between building management and residents by
              providing a seamless, secure, and intuitive platform that enhances
              communication and streamlines operations.
            </p>
          </div>
          {/* Our Vision Card */}
          <div className="group rounded-lg border backdrop-blur-sm p-6 transition-all duration-300 transform hover:scale-105
          bg-gray-200 border-gray-300 hover:border-indigo-500
          dark:bg-gray-800 dark:bg-opacity-80 dark:border-gray-700 dark:hover:border-indigo-500">
            <h2 className="text-2xl font-bold text-pink-600 mb-3 group-hover:text-pink-700 dark:text-pink-400 dark:group-hover:text-pink-300">
              Our Vision
            </h2>
            <p className="leading-relaxed text-gray-600 group-hover:text-gray-700 dark:text-gray-300 dark:group-hover:text-gray-200">
              We envision a world where property management is effortless, and
              every building becomes a thriving, interconnected community where
              technology works for everyone.
            </p>
          </div>
          {/* Why Choose Buildia Card */}
          <div className="group rounded-lg border backdrop-blur-sm p-6 transition-all duration-300 transform hover:scale-105
          bg-gray-200 border-gray-300 hover:border-indigo-500
          dark:bg-gray-800 dark:bg-opacity-80 dark:border-gray-700 dark:hover:border-indigo-500">
            <h2 className="text-2xl font-bold text-indigo-600 mb-3 group-hover:text-indigo-700 dark:text-indigo-400 dark:group-hover:text-indigo-300">
              Why Choose Buildia?
            </h2>
            <p className="leading-relaxed text-gray-600 group-hover:text-gray-700 dark:text-gray-300 dark:group-hover:text-gray-200">
              With our secure, role-based access and powerful state management
              with TanStack Query, Buildia offers a unique blend of
              functionality and security you won't find anywhere else.
            </p>
          </div>
        </div>

        {/* Counter Section */}
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg md:text-xl mb-2 dark:text-gray-400">
            Trusted by over
          </p>
          <div className="text-6xl md:text-8xl font-black text-indigo-600 drop-shadow-lg animate-pulse-slow dark:text-indigo-500">
            {animatedCount}+
          </div>
          <p className="text-gray-600 text-xl font-semibold mt-2 dark:text-gray-300">
            Satisfied Users
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <NavLink
            to={"/"}
            className="bg-indigo-600 text-gray-100 font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
          >
            Get Started with Buildia
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default About;