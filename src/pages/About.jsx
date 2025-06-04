import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-green-400 mb-8 text-center">About GlowGears</h1>
        <p className="text-green-300 text-lg leading-relaxed">
          GlowGears is dedicated to bringing you the best quality gaming and tech accessories
          with a focus on innovation and user satisfaction.
        </p>
        <p className="mt-4 text-green-300">
          Our mission is to provide immersive sound, high-performance gear, and the latest technology
          for gamers and tech enthusiasts around the world.
        </p>
        <p className="mt-4 text-green-300">
          Founded in 2023, GlowGears combines passion with expertise to ensure every product
          meets the highest standards.
        </p>
      </main>
      <Footer />
    </>
  );
}
