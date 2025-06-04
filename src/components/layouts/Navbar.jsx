import React, { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../../firebase/config"; // Firebase Firestore

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // Store user role (admin/user)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch user role from Firestore
        fetchUserRole(currentUser.uid);
      } else {
        setUser(null);
        setUserRole(null); // Reset role if no user is logged in
      }
    });
    return unsubscribe;
  }, []);

  const fetchUserRole = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId)); // Fetch user data from Firestore
      if (userDoc.exists()) {
        setUserRole(userDoc.data().role); // Set the user role (admin/user)
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
  };

  const handleShopNow = () => {
    navigate("/shop");
  };

  return (
    <header className="bg-black shadow-sm sticky top-0 z-50 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-500">GlowGears</div>

        <nav className="hidden md:flex space-x-8 text-green-300">
          {/* Only show Home and Admin Dashboard for admins */}
          {userRole === "admin" ? (
            <>
              <Link to="/" className="hover:text-green-400 transition">Home</Link>
              <Link to="/admin" className="hover:text-green-400 transition">Admin Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-green-400 transition">Home</Link>
              <Link to="/shop" className="hover:text-green-400 transition">Shop</Link>
              <Link to="/about" className="hover:text-green-400 transition">About</Link>
              <Link to="/support" className="hover:text-green-400 transition">Support</Link>
            </>
          )}
        </nav>

        <div className="relative" ref={dropdownRef}>
          {user ? (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none text-green-400 font-semibold"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <span>{user.displayName || user.email}</span>
              <svg
                className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          ) : (
            <Link
              to="/login"
              className="text-green-400 hover:underline font-semibold"
            >
              Login
            </Link>
          )}

          {dropdownOpen && user && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-green-600 rounded shadow-lg py-2 z-50">
              <Link
                to="/account"
                className="block px-4 py-2 hover:bg-green-600 hover:text-black transition"
                onClick={() => setDropdownOpen(false)}
              >
                Account
              </Link>
              <Link
                to="/cart"
                className="block px-4 py-2 hover:bg-green-600 hover:text-black transition"
                onClick={() => setDropdownOpen(false)}
              >
                Cart
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-green-600 hover:text-black transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
