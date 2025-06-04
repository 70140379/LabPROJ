import React, { useEffect, useState } from "react";
import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import HeroSection from '../components/layouts/views/home/HeroSection';
import TopCategories from '../components/layouts/views/home/TopCategories';
import FeaturesProducts from '../components/layouts/views/home/FeaturesProducts';
import Testimonials from '../components/layouts/views/home/Testimonials';
import NewsletterSignup from '../components/layouts/views/home/NewsletterSignup';

import SectionContainer from '../components/common/SectionContainer';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const snapshot = await getDocs(collection(db, "categories"));
        const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setErrorCategories("Failed to load categories.");
      } finally {
        setLoadingCategories(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        {loadingCategories ? (
          <p className="text-center mt-10 text-green-400">Loading categories...</p>
        ) : errorCategories ? (
          <p className="text-center mt-10 text-red-500">{errorCategories}</p>
        ) : (
          <TopCategories categories={categories} />
        )}

        <div className="bg-black">
          <SectionContainer>
            <FeaturesProducts />
          </SectionContainer>

          <SectionContainer>
            <Testimonials />
          </SectionContainer>
        </div>

        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
