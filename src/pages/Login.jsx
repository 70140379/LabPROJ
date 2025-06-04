import React, { useState } from "react";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data().role : "user";

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-center text-3xl font-extrabold text-green-400 mb-6">
            Login to your account
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded bg-zinc-800 border border-green-600 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded bg-zinc-800 border border-green-600 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded bg-green-600 hover:bg-green-500 text-black font-semibold transition-shadow shadow-md ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {error && (
            <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
          )}
          <p className="mt-6 text-center text-green-400">
            Don't have an account?{" "}
            <Link to="/signup" className="underline hover:text-green-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
