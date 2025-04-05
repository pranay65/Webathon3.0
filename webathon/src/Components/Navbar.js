import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

function Navbar({ toggleSidebar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const checkLogin = () => {
    setIsLoggedIn(!!window.localStorage.getItem("token"));
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.localStorage.removeItem("token");
    navigate("/login");
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 fixed w-full z-20 shadow-xl font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-gray-200 p-2 transition-colors duration-300"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-white font-extrabold text-2xl ml-3 tracking-wide"
              >
                Freelance Hub
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-center space-x-6">
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md transition-colors duration-300"
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="text-white hover:text-gray-200"
                  >
                    <FaUser className="h-6 w-6" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-gray-200 px-3 py-2 rounded-md transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`md:hidden fixed top-16 left-0 w-full bg-gradient-to-b from-blue-600 to-indigo-700 text-white transition-transform duration-300 ease-in-out ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-3 py-5 px-6">
          <Link
            to="/home"
            className="hover:bg-indigo-500 px-4 py-2 rounded transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:bg-indigo-500 px-4 py-2 rounded transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/services"
            className="hover:bg-indigo-500 px-4 py-2 rounded transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="hover:bg-indigo-500 px-4 py-2 rounded transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="hover:bg-indigo-500 px-4 py-2 rounded transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                <FaUser className="h-6 w-6 text-white" />
              </Link>
              <button
                onClick={handleLogout}
                className="hover:bg-indigo-500 px-4 py-2 rounded transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
