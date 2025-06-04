// src/components/layouts/views/home/TopCategories.jsx
import { Link } from "react-router-dom";

const TopCategories = ({ categories }) => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-400">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(({ id, name, image }) => (
            <Link
              to={`/shop/category/${id}`}
              key={id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-green-500/40 transition duration-300"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                <h3 className="text-green-300 text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                  {name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
