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
  };

  const sliderImages = [
    "/images/slider1.jpg",
    "/images/slider2.jpg",
    "/images/slider3.jpg",
    "/images/slider4.jpeg",
  ];

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
          {/* Hero Section */}
          <div className="relative w-full">
            {/* Background Image Slider */}
            <Slider {...settings}>
              {sliderImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    className="w-full h-[500px] object-cover rounded-none md:rounded-2xl transition-transform duration-500 hover:scale-105"
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
            <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-lg px-4">
              <Search />
            </div>
          </div>

          {/* Property Listings */}
          <div className="mt-16">
            <PropertyGrid />
          </div>

          {/* Our Goal Section */}
          <section className="bg-[#00032e] text-white py-20 px-6 md:px-12 lg:px-24 text-center">
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
            className="mt-8 px-4 overflow-hidden relative"
            style={{
              backgroundImage: "url('/images/slider2.jpg')", // Replace with your image URL
              backgroundSize: "110%", // Make the background image slightly bigger
              backgroundPosition: "top center", // Position it at the top to create a band effect
              backgroundRepeat: "no-repeat",
              height: "300px", // Adjust the height to make it appear like a band
            }}
          >
            {/* Dark Shade Overlay */}
            <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

            <div className="flex space-x-6 animate-marquee relative z-20 pt-6">
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
        </>
      )}
    </div>
  );
}
