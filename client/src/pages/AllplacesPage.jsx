import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Search from "../search";

export default function AllplacesPage() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"

  useEffect(() => {
    axios
      .get("/index-places")
      .then((response) => {
        setPlaces(response.data);
        setFilteredPlaces(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setLoading(false);
      });
  }, []);

  // Function to filter places by type
  const filterPlaces = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredPlaces(places);
    } else {
      const filtered = places.filter((place) => place.type === category);
      setFilteredPlaces(filtered);
    }
  };

  return (
    <div className="mt-8 flex-1">
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-white z-50">
          <video
            src="/images/load-time.mp4"
            autoPlay
            loop
            muted
            className="w-64 h-64 object-contain"
          />
        </div>
      ) : (
        <>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-2xl">
              <Search />
            </div>
            <img
              className="w-full h-[300px] object-cover rounded-2xl transform transition-transform duration-500 hover:scale-105"
              src="/images/slider1.jpg"
              alt="Featured Image"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex justify-center space-x-4 bg-[#00032e] p-4 mt-4 rounded-lg">
            {["All", "Apartment", "House", "Land", "Office"].map((category) => (
              <button
                key={category}
                onClick={() => filterPlaces(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#edbf6d] text-white"
                    : "bg-white text-[#00032e] border border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Places Grid */}
          <div className="mt-8 overflow-x-hidden px-4">
            <div className="flex space-x-6 animate-marquee">
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
                          src={
                            "http://localhost:4000/uploads/" + place.photos[0]
                          }
                          alt={place.title}
                        />
                      )}
                    </div>
                  </Link>
                ))}
              {/* Duplicate the images for infinite loop */}
              {places.length > 0 &&
                places.map((place) => (
                  <Link
                    to={"/place/" + place._id}
                    key={`duplicate-${place._id}`}
                    className="flex-shrink-0 w-[300px]"
                  >
                    <div className="rounded-2xl overflow-hidden relative group">
                      {place.photos?.[0] && (
                        <img
                          className="w-full h-[250px] object-cover rounded-2xl transform transition-transform duration-300 group-hover:scale-110"
                          src={
                            "http://localhost:4000/uploads/" + place.photos[0]
                          }
                          alt={place.title}
                        />
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
