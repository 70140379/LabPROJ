import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer"; 
import { useCart } from "../context/CartContext";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    async function fetchCategoryAndProducts() {
      setLoading(true);
      const catDoc = await getDoc(doc(db, "categories", categoryId));
      if (!catDoc.exists()) {
        setCategory(null);
        setProducts([]);
        setLoading(false);
        return;
      }
      setCategory({ id: catDoc.id, ...catDoc.data() });

      const q = query(collection(db, "products"), where("categoryId", "==", categoryId));
      const snapshot = await getDocs(q);
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      setLoading(false);
    }
    fetchCategoryAndProducts();
  }, [categoryId]);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  if (loading) return <p className="text-center mt-20 text-green-400">Loading...</p>;
  if (!category) return <p className="text-center mt-20 text-red-600">Category not found.</p>;

  return (
    <>
      <Navbar />
      <section className="bg-black text-white py-16 max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-green-400 mb-12 text-center">{category.name}</h1>
        <div className="space-y-10">
          {products.length === 0 ? (
            <p className="text-center text-gray-400">No products found in this category.</p>
          ) : (
            products.map(product => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row bg-zinc-900 rounded-lg shadow-lg p-6 hover:shadow-green-500/50 transition"
              >
                <div className="sm:w-1/3 h-48 sm:h-auto flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:w-2/3 sm:pl-8 flex flex-col justify-between mt-4 sm:mt-0">
                  <div>
                    <h2 className="text-2xl font-semibold text-green-400">{product.name}</h2>
                    <p className="mt-2 text-green-300">{product.description}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-green-500 font-bold text-xl">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAdd(product)}
                      className={`bg-green-600 text-black font-semibold px-5 py-2 rounded-full transition-shadow ${
                        addedId === product.id
                          ? "hover:shadow-lg hover:shadow-green-500 shadow-lg shadow-green-500"
                          : "hover:bg-green-500"
                      }`}
                    >
                      {addedId === product.id ? "Added!" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
  