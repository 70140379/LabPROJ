import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch categories realtime
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      const cats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
    });
    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setName("");
    setImageUrl("");
    setDescription("");
    setError("");
    setLoading(false);
    setEditId(null);
  };

  const handleShowForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setName(category.name);
    setImageUrl(category.image);
    setDescription(category.description || "");
    setEditId(category.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteDoc(doc(db, "categories", id));
      } catch (err) {
        alert("Failed to delete category: " + err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !description || !imageUrl) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      if (editId) {
        const categoryRef = doc(db, "categories", editId);
        await updateDoc(categoryRef, {
          name,
          image: imageUrl,
          description,
        });
        alert("Category updated successfully.");
      } else {
        await addDoc(collection(db, "categories"), {
          name,
          image: imageUrl,
          description,
        });
        alert("Category added successfully.");
      }
      resetForm();
      setShowForm(false);
    } catch (err) {
      setError("Failed to save category: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Categories</h2>

      {!showForm && (
        <button
          onClick={handleShowForm}
          className="mb-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-500 transition"
        >
          {editId ? "Edit Category" : "Add New Category"}
        </button>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 border border-gray-300 p-4 rounded max-w-xl mx-auto"
        >
          <div>
            <label className="block mb-1 font-semibold">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Category Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Category Image URL</label>
            <input
              type="url"
              placeholder="Paste image URL here"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Category Preview"
                className="mt-2 h-32 object-contain rounded border border-gray-300"
              />
            )}
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-600 text-white px-5 py-2 rounded hover:bg-green-500 transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (editId ? "Updating..." : "Adding...") : editId ? "Update Category" : "Add Category"}
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="px-5 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Category List */}
      {categories.length === 0 ? (
        <p className="text-center text-gray-600">No categories found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 w-24">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Description</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(({ id, name, image, description }) => (
              <tr key={id} className="border-b border-gray-300 hover:bg-gray-50 transition">
                <td className="p-2 w-24">
                  <img
                    src={image}
                    alt={name}
                    className="h-16 w-16 object-contain rounded-md border border-gray-300"
                  />
                </td>
                <td className="p-2 font-semibold align-middle">{name}</td>
                <td className="p-2 align-middle">{description}</td>
                <td className="p-2 flex space-x-3 justify-center">
                  <button
                    onClick={() => handleEdit({ id, name, image, description })}
                    className="px-4 py-1 bg-yellow-400 rounded hover:bg-yellow-300 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
