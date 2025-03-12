import React, { useEffect, useRef, useState } from "react";
import "./index.css";

const PropertyGrid = () => {
  const [isInView, setIsInView] = useState(false);

  const fadeInRef = useRef(null);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true); // Trigger the fade-in effect
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is in the viewport
      }
    );

    if (fadeInRef.current) {
      observer.observe(fadeInRef.current);
    }

    return () => {
      if (fadeInRef.current) {
        observer.unobserve(fadeInRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative grid grid-cols-2 gap-6 p-6 mt-6 bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/land_bg.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Buy Property Section */}
      <div
        ref={fadeInRef}
        className={`relative group overflow-hidden rounded-lg z-10 fade-in ${
          isInView ? "visible" : ""
        }`}
      >
        <img
          src="/images/buy property.jpg"
          alt="buy property"
          className="w-full h-96 object-cover rounded-lg transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <button className="px-6 py-2 rounded-lg bg-[#edbf6d] text-[#00032e] hover:bg-[#d9a856]">
            Buy Property
          </button>
        </div>
      </div>

      {/* Sell Property Section */}
      <div
        className={`relative group overflow-hidden rounded-lg z-10 fade-in ${
          isInView ? "visible" : ""
        }`}
      >
        <img
          src="/images/sell property.jpg"
          alt="sell property"
          className="w-full h-96 object-cover rounded-lg transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <button className="px-6 py-2 rounded-lg bg-[#edbf6d] text-[#00032e] hover:bg-[#d9a856]">
            Sell Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;
