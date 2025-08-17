import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';

const About = () => {
  const [inView, setInView] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);

  // Intersection Observer to trigger animations when the component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    const target = document.getElementById('about-section');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  // Simple counter animation
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setAnimatedCount(prevCount => {
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
    <div
      id="about-section"
      className="relative bg-gray-950 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100 p-8 md:p-12 lg:p-16 my-8 overflow-hidden"
    >
      <div className={`relative z-10 mx-auto max-w-6xl transition-transform duration-1000 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 drop-shadow-md">
            About Buildia: The Future of Property Management
          </h1>
          <p className="mt-4 text-gray-400 text-lg md:text-xl">
            Your all-in-one platform for modern, efficient, and community-focused building management.
          </p>
        </div>

        {/* Feature Grid with Hover Animations */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Feature 1 */}
          <div className="group bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 p-6">
            <h2 className="text-2xl font-bold text-indigo-400 mb-3 group-hover:text-indigo-300">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed group-hover:text-gray-200">
              To bridge the gap between building management and residents by providing a seamless, secure, and intuitive platform that enhances communication and streamlines operations.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="group bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 p-6">
            <h2 className="text-2xl font-bold text-pink-400 mb-3 group-hover:text-pink-300">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed group-hover:text-gray-200">
              We envision a world where property management is effortless, and every building becomes a thriving, interconnected community where technology works for everyone.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="group bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 p-6">
            <h2 className="text-2xl font-bold text-indigo-400 mb-3 group-hover:text-indigo-300">Why Choose Buildia?</h2>
            <p className="text-gray-300 leading-relaxed group-hover:text-gray-200">
              With our secure, role-based access and powerful state management with TanStack Query, Buildia offers a unique blend of functionality and security you won't find anywhere else.
            </p>
          </div>
        </div>

        {/* Dynamic Counter Section */}
        <div className="text-center mb-12">
          <p className="text-gray-400 text-lg md:text-xl mb-2">
            Trusted by over
          </p>
          <div className="text-6xl md:text-8xl font-black text-indigo-500 drop-shadow-lg animate-pulse-slow">
            {animatedCount}+
          </div>
          <p className="text-gray-300 text-xl font-semibold mt-2">
            Satisfied Users
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <NavLink to={'/'}
            href="#"
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