import React from "react";
import { Link } from "react-router-dom";

const MarqueeSlider = ({ places }) => {
  return (
    <div className="relative pt-6">
      {/* Top Sliding Set */}
      <div className="flex space-x-6 animate-marquee-left absolute top-0 left-0 z-20">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/place/" + place._id}
              key={place._id}
              className="flex-shrink-0 w-[300px]"
            >
              <div className="rounded-2xl overflow-hidden relative group">
                {place.photos?.[0] && (
                  <img
                    className="w-full h-[250px] object-cover rounded-2xl transform transition-transform duration-300 group-hover:scale-110"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt={place.title}
                  />
                )}
              </div>
            </Link>
          ))}
      </div>

      {/* Bottom Sliding Set */}
      <div className="flex space-x-6 animate-marquee-right absolute bottom-0 left-0 z-10">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/place/" + place._id}
              key={place._id}
              className="flex-shrink-0 w-[300px]"
            >
              <div className="rounded-2xl overflow-hidden relative group">
                {place.photos?.[0] && (
                  <img
                    className="w-full h-[250px] object-cover rounded-2xl transform transition-transform duration-300 group-hover:scale-110"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt={place.title}
                  />
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MarqueeSlider;
