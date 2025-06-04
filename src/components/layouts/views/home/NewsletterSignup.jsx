const NewsletterSignup = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-400">Stay Updated</h2>
        <p className="mb-8 max-w-2xl mx-auto text-gray-300">
          Subscribe to our newsletter for the latest products, deals, and news.
        </p>
        <div className="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-black placeholder-gray-500"
          />
          <button className="bg-green-500 hover:bg-green-400 px-6 py-3 rounded-r-lg font-bold text-black transition hover:shadow-[0_0_15px_#00FF00]">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
