import React from "react";

const PropertyGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-6 p-6 mt-6">
      {/* Buy Property Section */}
      <div className="relative group overflow-hidden rounded-lg">
        <img
          src="/images/buy property.jpg"
          alt="buy property"
          className="w-full h-96 object-cover rounded-lg opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <button className="px-6 py-2 rounded-lg bg-[#edbf6d] text-[#00032e] hover:bg-[#d9a856]">
            Buy Property
          </button>
        </div>
      </div>

      {/* Sell Property Section */}
      <div className="relative group overflow-hidden rounded-lg">
        <img
          src="/images/sell property.jpg"
          alt="sell property"
          className="w-full h-96 object-cover rounded-lg opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <button className="px-6 py-2  rounded-lg bg-[#edbf6d] text-[#00032e] hover:bg-[#d9a856]">
            Sell Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;
