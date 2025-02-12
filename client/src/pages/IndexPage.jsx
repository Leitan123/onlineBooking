import { Link } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick"; // Import Slider component from react-slick

// Import slick-carousel CSS files for styling
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [propertyType, setPropertyType] = useState("Apartment"); // State to manage property type

  useEffect(() => {
    axios.get("/index-places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  // Update property type every 2 seconds
  useEffect(() => {
    const types = ["Apartment", "House", "Land", "Office"];
    let index = 0;

    const interval = setInterval(() => {
      setPropertyType(types[index]);
      index = (index + 1) % types.length; // Loop through the property types
    }, 2000); // Change every 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Slider settings
  const settings = {
    infinite: true, // Enables infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Automatic sliding
    autoplaySpeed: 3000, // Time interval between slides
    arrows: true, // Display left and right arrows
    dots: true, // Display navigation dots
  };

  // Static image paths for the slider
  const sliderImages = [
    "/images/slider1.jpg",
    "/images/slider2.jpg",
    "/images/slider3.jpg", // Add more images as needed
  ];

  return (
    <div className="mt-8 flex-1">
      <div className="relative">
        {/* "Hello" text on top of the slider */}
        <h1 className="absolute  ml-10 mt-10 pt-10 top-10 font-bold text-5xl text-white z-10 text-shadow-md transform transition-all duration-500">
          Buy & Sell <br />
          your <span className="text-yellow-400">{propertyType}</span>{" "}
          {/* Display the changing property type */}
        </h1>

        {/* Overlay background for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>

        {/* Image Slider */}
        <Slider {...settings}>
          {sliderImages.map((image, index) => (
            <div key={index}>
              <img
                className="w-full h-[400px] object-cover rounded-2xl transform transition-transform duration-500 hover:scale-105"
                src={image} // Use the static image path
                alt={`Slider Image ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>
      {/* Grid of places */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/place/" + place._id} key={place._id}>
              <div className="rounded-2xl overflow-hidden relative group">
                {place.photos?.[0] && (
                  <img
                    className="w-full aspect-square object-cover rounded-2xl transform transition-transform duration-300 group-hover:scale-110"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt={place.title}
                  />
                )}
              </div>
              <h2 className="text-sm">{place.title}</h2>
              <h3 className="font-bold text-gray-500">{place.address}</h3>
              <div className="mt-2">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
