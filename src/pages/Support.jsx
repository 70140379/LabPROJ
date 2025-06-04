import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

export default function Support() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-green-400 mb-8 text-center">Support</h1>
        <p className="text-green-300 text-lg leading-relaxed">
          Welcome to the support page! If you have any questions, issues, or need assistance,
          please contact our support team at <a href="mailto:support@glowgears.com" className="underline text-green-500">support@glowgears.com</a>.
        </p>
        <p className="mt-4 text-green-300">
          You can also reach us via our social media channels or by calling <strong>+1 (555) 123-4567</strong>.
        </p>
      </main>
      <Footer />
    </>
  );
}
