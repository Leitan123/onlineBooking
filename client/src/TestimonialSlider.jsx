import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    text: "Booker made buying my first home incredibly easy. Highly recommend!",
  },
  {
    name: "Sarah Johnson",
    text: "A seamless experience! I sold my property within days. Great platform!",
  },
  {
    name: "Michael Smith",
    text: "The best real estate platform! Easy to use and trustworthy listings.",
  },
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  // Go to next slide
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Go to previous slide
  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Handle arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="mt-6 relative max-w-2xl mx-auto bg-white text-[#00032e] p-6 rounded-2xl shadow-lg h-48 md:h-56 flex items-center">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#edbf6d] p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Testimonial Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full flex flex-col justify-center"
        >
          <p className="text-xl italic text-gray-400 px-4 max-w-xl mx-auto">
            "{testimonials[index].text}"
          </p>
          <h3 className="mt-4 font-bold text-[#edbf6d] text-lg">
            - {testimonials[index].name}
          </h3>
        </motion.div>
      </AnimatePresence>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#edbf6d] p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default TestimonialSlider;
