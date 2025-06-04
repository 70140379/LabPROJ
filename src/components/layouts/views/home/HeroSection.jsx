import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shop"); // Navigates to the Shop page
  };

  return (
    <section
      className="relative h-96 flex items-center bg-cover bg-center"
      style={{
        backgroundImage: `url('./src/assets/HeroSection.png')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4 drop-shadow-lg">
            Summer Collection 2025
          </h1>
          <p className="text-xl text-white mb-6">
            Discover our new arrivals with exclusive discounts
          </p>
          <button
            onClick={handleShopNow}
            className="bg-green-500 text-black font-bold py-3 px-6 rounded-full transition transform hover:scale-105 hover:shadow-[0_0_20px_#00FF00]"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
