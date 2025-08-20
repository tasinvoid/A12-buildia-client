import React, { useContext } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from "../../../Context/Theme/ThemeContext";

const ThemeToggleBtn = () => {
    const {theme,toggleTheme} = useContext(ThemeContext)
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-indigo-400 bg-gray-800 border border-gray-700 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <FaSun className="w-5 h-5" />
      ) : (
        <FaMoon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggleBtn;
