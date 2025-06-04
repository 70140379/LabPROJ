import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] bg-black text-white max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-green-400">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center mt-20">
            <p className="mb-4 text-lg">Your cart is empty.</p>
            <Link
              to="/"
              className="inline-block bg-green-600 hover:bg-green-500 text-black font-semibold px-6 py-2 rounded"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <ul>
              {cartItems.map(({ id, title, price, quantity, image }) => (
                <li
                  key={id}
                  className="flex justify-between items-center border-b border-green-700 py-3"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={image}
                      alt={title}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div>
                      <p className="font-semibold">{title}</p>
                      <p className="text-green-300">Quantity: {quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-semibold text-green-400">
                      ${(price * quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(id)}
                      className="text-red-600 hover:text-red-400 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-right">
              <p className="text-xl font-bold text-green-400">
                Total: ${total.toFixed(2)}
              </p>
              <button
                onClick={clearCart}
                className="mt-4 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
