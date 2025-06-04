import React, { useState } from "react";
import ProductManager from "../components/admin/ProductManager"; // Move your existing Admin product code here or rename Admin.jsx accordingly
import CategoryManager from "../components/admin/CategoryManager";
import AdminLayout from "../components/admin/AdminLayout";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <>
    <Navbar />
     <AdminLayout>
    <div className="max-w-6xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-6 py-2 rounded font-semibold ${
            activeTab === "products"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-6 py-2 rounded font-semibold ${
            activeTab === "categories"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Categories
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "products" && <ProductManager />}
      {activeTab === "categories" && <CategoryManager />}
    </div>
    </AdminLayout>
    <Footer />
    </>
  );
}
