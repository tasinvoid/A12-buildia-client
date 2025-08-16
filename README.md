# 🏠 BuildiDA - Apartment Management System

## ✨ live link - https://buildia-92b37.web.app/

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Overview

BuildiDA is a modern, full-stack web application designed to streamline apartment management, from showcasing available units to handling user agreements and providing administrative oversight. It offers a seamless experience for both potential tenants and property administrators.

---

## 🚀 Features

BuildiDA comes packed with features to ensure comprehensive apartment management:

### Public Features:

- **Apartment Listings:** Browse through available apartment units with detailed information, including images, apartment number, block name, floor, and rent.
- **Interactive Modals:** View more details about an apartment, including additional descriptions and availability, via a sleek, dark-themed modal.
- **User Authentication:** Securely log in using **email/password** or **Google Sign-In** (Firebase Authentication).
- **Agreement Submission:** Users can initiate an agreement process for an apartment, which transitions their status to "pending" for administrator review.

### Admin Features:

- **Dashboard Overview:** Administrators get a comprehensive view of the system's vital statistics, including:
  - Total rooms
  - Percentage of available and unavailable rooms
  - Total users and total members (agreed tenants)
- **Coupon Management:** Admins can manage promotional coupons, including:
  - Viewing all existing coupons (code, discount, expiry, description).
  - **Adding new coupons** through a dedicated modal with validation (coupon code, discount percentage, expiry date validation).
  - **Toggling coupon availability** (active/inactive) with immediate updates and confirmation prompts.
- **User Management:** (Inferred from "Total Users" and "Total Members" stats) Admins can likely view and manage user roles and statuses. _(Further development would include explicit user list and role management functionalities)_

---

## 🛠 Technologies Used

BuildiDA is built using a robust MERN stack architecture complemented by modern frontend libraries:

### Frontend:

- **React.js:** A powerful JavaScript library for building user interfaces.
- **Material-UI (MUI):** A comprehensive React UI library that provides pre-built, accessible, and customizable components (e.g., Card, Button, Modal).
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs directly in your markup.
- **Lottie-React:** For embedding beautiful Lottie animations to enhance the user experience.
- **React Icons:** A collection of popular SVG icon packs as React components (e.g., `FiMapPin`, `FaUserShield`).
- **React Query (TanStack Query):** For efficient data fetching, caching, synchronization, and state management, providing a seamless user experience.
- **React Hook Form:** For streamlined form management and validation.
- **React Modal:** A component for creating accessible dialog windows.
- **SweetAlert2:** For custom beautiful alert messages.

### Backend:

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB:** A NoSQL database for storing application data (apartments, users, coupons, agreements).
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JSON Web Tokens (JWT):** For secure authentication and authorization.
- **Dotenv:** For loading environment variables from a `.env` file.
- **Nodemon:** A utility that monitors for changes in your source and automatically restarts your server.

### Authentication & Deployment:

- **Firebase Authentication:** For robust user authentication (Email/Password, Google Sign-In).
- **Axios:** Promise-based HTTP client for making API requests.

---

## 🎨 Design & Styling

The application features a sleek and modern **dark theme** with a focus on usability and visual appeal:

- **Background:** A deep gradient (`bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950`) creates an immersive dark atmosphere.
- **Card/Paper Elements:** Semi-transparent dark gray (`bg-gray-800 bg-opacity-80 backdrop-blur-sm`) with subtle borders provides a "frosted glass" effect.
- **Primary Accent:** Various shades of **Indigo** (`text-indigo-400`, `bg-indigo-600`) are used for primary actions, titles, and interactive elements.
- **Secondary Accent:** **Pink** (`text-pink-400`, `bg-pink-500`) is used for decorative elements and highlights.
- **Text Colors:** A gradient of light grays (`text-gray-100` to `text-gray-500`) ensures readability across different components.

---

## 💡 Future Improvements

Here are some areas for future development to enhance BuildiDA:

- **Payment Integration:** Implement a secure payment gateway for rent payments and agreement fees.
- **Real-time Notifications:** Add real-time notifications for new agreement requests, status changes, and announcements.
- **Search and Filter:** Enhance apartment listings with advanced search and filtering options (e.g., by price range, number of bedrooms, amenities).
- **Admin User List & Role Management:** A dedicated admin page to view, search, and manage all users, allowing for role changes (e.g., marking members) and user deactivation.
- **Detailed Agreement Management:** Provide admins with more tools to review, approve, reject, or terminate agreements, including digital signature capabilities.
- **Analytics & Reporting:** Expand the admin dashboard with more detailed analytics, charts, and downloadable reports on room occupancy, revenue, and user engagement.
- **User Dashboards:** Create personalized dashboards for regular users to track their agreement status, view payment history, and manage their profile.
- **Image Upload & Management:** Implement a more robust image upload system for apartment images, allowing admins to add, edit, and delete photos.
- **Responsive Design Refinements:** Continuously optimize responsiveness for a flawless experience across all devices and screen sizes.
- **Unit Amenities:** Add a structured way to list and filter by apartment amenities (e.g., gym, parking, pool).
- **Dark/Light Mode Toggle:** While currently dark-themed, providing a user-selectable theme toggle could enhance user preference.
