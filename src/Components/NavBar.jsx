import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout: logoutFromContext } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    logoutFromContext();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-base-100 shadow-sm px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center btn btn-ghost text-xl p-0 gap-2"
        >
          <img src={logo} alt="AdmitEase Logo" className="h-16" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="btn btn-ghost">
            Home
          </Link>
          <Link to="/colleges" className="btn btn-ghost">
            Colleges
          </Link>
          <Link to="/admission" className="btn btn-ghost">
            Admission
          </Link>
          <Link to="/my-college" className="btn btn-ghost">
            My College
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="btn btn-ghost normal-case text-base"
              >
                {user.displayName || "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="btn btn-square btn-ghost"
            aria-label="Toggle menu"
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                // X icon for close
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                // Hamburger icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 border-t border-gray-200">
          <Link
            to="/"
            className="block btn btn-ghost w-full text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/colleges"
            className="block btn btn-ghost w-full text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            Colleges
          </Link>
          <Link
            to="/admission"
            className="block btn btn-ghost w-full text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            Admission
          </Link>
          <Link
            to="/my-college"
            className="block btn btn-ghost w-full text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            My College
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="block btn btn-ghost w-full text-left normal-case text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                {user.displayName || "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline text-red-600 w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;