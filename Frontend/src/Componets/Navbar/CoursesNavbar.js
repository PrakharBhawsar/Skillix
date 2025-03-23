import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CoursesNavbar() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("Username");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex bg-gray-900 text-white justify-between items-center p-4">
      <Link to="/courses" className="flex items-center">
        <img src="/logo.png" className="h-6 ml-5 sm:h-9" alt="Logo" />
      </Link>
      <div className="hidden sm:flex gap-8">
        <Link to="/courses" className="home-nav-link hover:text-gray-300">
          All Courses
        </Link>
        <Link to="/MyCourses" className="home-nav-link hover:text-gray-300">
          My Course
        </Link>
        <Link to="/modulator" className="home-nav-link hover:text-gray-300">
          Moderate Courses
        </Link>
      </div>
      <div className="relative" ref={menuRef}>
        <div className="mr-10" onClick={toggleMenu}>
          <i className="fas fa-user-circle text-2xl cursor-pointer"></i>
        </div>
        {isMenuOpen && (
          <div className="absolute bottom-0 top-8 left--5 right-5 shadow-lg h-auto w-auto z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <div
              className="flex flex-col space-y-2 py-2 p-4 text-black"
              style={{
                background: "#1f2937",
                border: "none",
                borderRadius: "10px",
              }}
            >
              <Link to={`/publicprofile/?username=${username}`}>
                <button className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                  My Profile
                </button>
              </Link>
              <button
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                onClick={() => {
                  sessionStorage.clear();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
