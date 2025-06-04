import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

export default function Account() {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (newPassword && newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name });
      }

      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { name });

      if (newPassword) {
        if (!currentPassword) {
          setError("Please enter your current password to change password.");
          setLoading(false);
          return;
        }

        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, newPassword);
      }

      setMessage("Profile updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-zinc-900 rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-400">
              You must be logged in to view this page.
            </h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-green-400">
            Account Settings
          </h2>
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-green-400">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded bg-zinc-800 border border-green-600 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-green-400">
                Email (cannot be changed)
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 rounded bg-zinc-700 border border-zinc-600 text-gray-400 cursor-not-allowed"
              />
            </div>

            <hr className="border-green-600 my-6" />

            <div>
              <label className="block mb-2 font-semibold text-green-400">
                Current Password (required to change password)
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-3 rounded bg-zinc-800 border border-green-600 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-green-400">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded bg-zinc-800 border border-green-600 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-green-400">Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded bg-zinc-800 border border-green-600 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {error && <p className="text-red-600 font-semibold">{error}</p>}
            {message && <p className="text-green-600 font-semibold">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded bg-green-600 hover:bg-green-500 text-black font-semibold transition-shadow shadow-md ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
