import { useState } from "react";
import { useCart } from "../../../../context/CartContext";

const products = [
  {
    id: 1,
    name: "GG-3-Special Edition",
    price: 99.99,
    image: "https://i.ibb.co/27KjXYFV/Headphones.jpg",
    description: "Immersive sound for gaming and music lovers.",
  },
  {
    id: 2,
    name: "GG-Phone-5G",
    price: 199.99,
    image: "https://i.ibb.co/Y4hkQxPV/Mobile.jpg",
    description: "Latest 5G smartphone with powerful features.",
  },
  {
    id: 3,
    name: "GG-SLIM",
    price: 779.99,
    image: "https://i.ibb.co/HLNwG6XW/Laptops.jpg",
    description: "Slim and lightweight high-performance laptop.",
  },
  {
    id: 4,
    name: "GG-Keys2",
    price: 49.99,
    image: "https://i.ibb.co/LMzxF0m/Keyboards.jpg",
    description: "Mechanical keyboard with customizable keys.",
  },
];

const FeaturesProducts = () => {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-500">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 rounded-lg shadow-lg hover:shadow-green-500/50 transition duration-300 overflow-hidden"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-green-400 font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAdd(product)}
                    className={`bg-green-600 text-black font-semibold px-4 py-2 rounded-full text-sm transition-shadow ${
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesProducts;
