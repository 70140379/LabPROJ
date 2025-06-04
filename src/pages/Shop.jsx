import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";  // Import Navbar
import Footer from "../components/layouts/Footer";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const snapshot = await getDocs(collection(db, "categories"));
        setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading categories...</p>;
  if (!categories.length) return <p className="text-center mt-20">No categories found.</p>;

  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-400">Shop by Category</h2>
          <div className="flex flex-col space-y-10">
            {categories.map(({ id, name, image, description }) => (
              <div
                key={id}
                onClick={() => navigate(`/shop/category/${id}`)}
                className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-green-500/40 transition duration-300"
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 hover:brightness-75"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-center items-center p-8 text-center">
                  <h3 className="text-green-300 text-4xl font-bold drop-shadow-lg mb-2 transition-transform duration-300 hover:scale-110">
                    {name}
                  </h3>
                  <p className="max-w-xl text-green-300 drop-shadow">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
