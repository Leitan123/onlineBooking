import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TypewriterEffect from "../TypewriterEffect";
import Search from "../search";
import PropertyGrid from "../PropertyGrid";
import TestimonialSlider from "../TestimonialSlider";
import "../index.css"; // Import the stylesheet for this component
import Footer from "../Footer";
import StatsSection from "../statsSection";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/index-places").then((response) => {
      setPlaces(response.data);
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: true,
    pauseOnHover: false, // This will make the images slide even when the cursor is on top
  };

  const sliderImages = [
    "/images/slider1.jpg",
    "/images/slider2.jpg",
    "/images/slider3.jpg",
    "/images/slider4.jpeg",
  ];

  return (
    <div className=" flex-1">
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
          {/* Hero Section */}
          <div className="relative w-full h-screen">
            {/* Background Image Slider */}
            <Slider {...settings}>
              {sliderImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    className="w-full h-screen object-cover transition-transform duration-500 hover:scale-105"
                    src={image}
                    alt={`Slider Image ${index + 1}`}
                  />
                  {/* Overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                </div>
              ))}
            </Slider>

            {/* Typewriter Heading */}
            <h1 className="absolute left-6 md:left-10 top-1/3 transform -translate-y-1/2 font-bold text-4xl md:text-6xl text-white z-20 text-shadow-md transition-all duration-500">
              Buy & Sell <br />
              your{" "}
              <span className="text-yellow-400">
                <TypewriterEffect />
              </span>
            </h1>

            {/* Search Component */}
            <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-lg px-4"></div>
          </div>
          <div className="ml-10">
            <StatsSection />
          </div>

          {/* Property Listings */}
          <div className="mt-16">
            <PropertyGrid />
          </div>

          {/* Our Goal Section */}
          <section className="bg-[#1a2c39] text-white py-20 px-6 md:px-12 lg:px-24 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#edbf6d] mb-6">
                Our Goal
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                At <span className="text-[#edbf6d] font-semibold">Booker</span>,
                we make buying and selling properties{" "}
                <span className="text-[#edbf6d] font-semibold">
                  easy, fast, and secure.
                </span>{" "}
                Whether you're searching for your dream home or listing a
                property, our platform connects you with the right buyers and
                sellers effortlessly.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300 mt-4">
                With a{" "}
                <span className="font-semibold">user-friendly interface</span>,
                verified listings, and expert support, we ensure a seamless real
                estate experience.
              </p>
              <p className="text-2xl font-semibold text-[#edbf6d] mt-6">
                🏡 Find. Connect. Own.
              </p>
            </div>
          </section>

          {/* Testimonials Section */}
          <div className="my-20">
            <TestimonialSlider />
          </div>

          {/* Moving Places Images Section */}
          <div
            className="mt-8 px-4 overflow-hidden relative bg-fixed bg-cover bg-center h-[600px]"
            style={{ backgroundImage: "url('/images/land_bg2.jpeg')" }}
          >
            {/* Dark Shade Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

            {/* Marquee Right */}
            <div className="flex space-x-6 animate-marquee-right relative z-20 pt-6">
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
            </div>

            {/* Marquee Left */}
            <div className="flex space-x-6 animate-marquee-left relative z-20 pt-6">
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
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Link
              to="/Allplaces"
              className="flex items-center gap-2 bg-[#edbf6d] text-[#00032e] hover:bg-[#d9a856] px-4 py-2 rounded-2xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              More
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
