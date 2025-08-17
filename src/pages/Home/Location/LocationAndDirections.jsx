import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const center = [23.7949, 90.4077];

const LocationAndDirections = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const detailsVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.section
      className="container mx-auto px-4 py-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-5xl font-extrabold text-center mb-12 text-green-600 dark:text-gray-100"
        variants={itemVariants}
      >
        Our Prime Location & Easy Access
      </motion.h2>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
        {}
        <motion.div
          className="lg:w-2/3 w-full rounded-xl shadow-2xl overflow-hidden"
          variants={mapVariants}
          style={{ height: "500px" }}
        >
          <MapContainer
            center={center}
            zoom={10}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            {}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              detectRetina={true}
            />
            <Marker position={center}>
              <Popup>
                Buildia Towers, <br /> Your Dream Home.
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>

        {}
        <motion.div
          className="lg:w-1/3 w-full text-center lg:text-left bg-base-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          variants={detailsVariants}
        >
          <motion.h3
            className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400"
            variants={itemVariants}
          >
            Find Us Effortlessly
          </motion.h3>
          <motion.p
            className="text-lg text-gray-300 dark:text-gray-300 mb-6 leading-relaxed"
            variants={itemVariants}
          >
            Buildia Towers is strategically situated in the vibrant heart of
            Dhaka, offering unparalleled access to everything you need. Whether
            you're commuting to work or exploring the city, our location ensures
            convenience at every turn.
          </motion.p>

          <motion.div className="mb-6" variants={itemVariants}>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Our Address:
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              House #123, Road #45, Block A,
              <br />
              Banani, Dhaka, 20890
            </p>
          </motion.div>

          <motion.a
            href={`http://maps.google.com/?q=${center[0]},${center[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
            variants={itemVariants}
          >
            Get Directions on Google Maps
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LocationAndDirections;
