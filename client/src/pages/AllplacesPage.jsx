import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "../search";

export default function AllplacesPage() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");

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

  useEffect(() => {
    filterPlaces();
  }, [
    selectedDistrict,
    selectedPriceRange,
    selectedPropertyType,
    selectedCategory,
  ]);

  const filterPlaces = () => {
    let filtered = places;

    if (selectedDistrict) {
      filtered = filtered.filter(
        (place) => place.district === selectedDistrict
      );
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter((place) => {
        const price = Number(place.price);
        return max ? price >= min && price <= max : price >= min;
      });
    }

    if (selectedPropertyType) {
      filtered = filtered.filter(
        (place) => place.propertyType === selectedPropertyType
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (place) => place.propertyType === selectedCategory
      );
    }

    setFilteredPlaces(filtered);
  };

  return (
    <div
      className="mt-0 flex-1 min-h-screen bg-fixed bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/images/places_bg.jpeg')" }}
    >
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-white z-50 pb-4">
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
              <Search
                setSelectedDistrict={setSelectedDistrict}
                setSelectedPriceRange={setSelectedPriceRange}
                setSelectedPropertyType={setSelectedPropertyType}
              />
            </div>
            <img
              className="w-full h-[320px] object-cover rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-105"
              src="/images/slider1.jpg"
              alt="Featured Image"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex justify-center space-x-4 bg-white/10 backdrop-blur-md p-4 mt-6 rounded-xl shadow-lg border border-white/20">
            {["All", "Apartment", "House", "Land", "Office"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#edbf6d] text-[#00032e] shadow-lg"
                    : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Places Grid */}
          <div className="mt-10 px-6 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {filteredPlaces.length > 0 &&
                filteredPlaces.map((place) => (
                  <Link
                    to={"/place/" + place._id}
                    key={place._id}
                    className="w-full"
                  >
                    <div className="relative rounded-xl overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300">
                      {place.photos?.[0] && (
                        <img
                          className="w-full h-[200px] object-cover rounded-xl transform transition-transform duration-300 group-hover:scale-105"
                          src={
                            "http://localhost:4000/uploads/" + place.photos[0]
                          }
                          alt={place.title}
                        />
                      )}

                      {/* Title and Price */}
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 text-white rounded-b-xl">
                        <h3 className="text-lg font-bold">{place.title}</h3>
                        <p className="text-sm font-medium opacity-90">
                          {place.price} LKR
                        </p>
                      </div>
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
