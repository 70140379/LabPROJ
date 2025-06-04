const Footer = () => {
  return (
    <footer className="bg-black text-green-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-green-500">GlowGears</h3>
            <p className="text-gray-400">Your one-stop shop for all your needs.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-green-500">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition">Shop</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-green-500">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition">Returns & Refunds</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-green-500">Connect With Us</h4>
            <div className="flex space-x-4">
              {[
                'facebook',
                'twitter',
                'instagram',
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {/* Your original SVGs remain here — just abstracted for brevity */}
                    {/* ... */}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} <span className="text-green-500">GlowGears</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
