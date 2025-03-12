import { useEffect, useState } from "react";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [imageInView, setImageInView] = useState(false);

  const testimonials = [
    {
      name: "Alexan Micelito",
      role: "Senior Manager",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Home is where love resides, memories are created, and dreams are nurtured. I've found my sanctuary in this beautiful property. Finding the perfect home that resonates with your own style, coupled with modern aesthetics, is priceless.",
    },
    {
      name: "Jane Doe",
      role: "Marketing Specialist",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      text: "I couldn't have asked for a better experience. This property is everything I've ever wanted and more. The design and ambiance make it feel like home from day one.",
    },
    {
      name: "John Smith",
      role: "Product Manager",
      image: "https://randomuser.me/api/portraits/men/34.jpg",
      text: "An absolutely stunning place! The perfect blend of modernity and comfort. It’s been a great experience living here, and I recommend it to anyone looking for quality and peace of mind.",
    },
    {
      name: "Emma Jones",
      role: "Architect",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      text: "From the moment I stepped in, I knew this was the place for me. The attention to detail and thoughtful design make it truly unique. I love living here.",
    },
  ];

  // Function to move to the next testimonial with a sliding effect
  const goToNext = () => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setTransitioning(false);
    }, 500); // 500ms to match transition duration
  };

  // Set an interval to automatically change the testimonial every 5 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  // IntersectionObserver callback to detect when the image comes into view
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setImageInView(true); // Trigger the pop-out animation when in view
      } else {
        setImageInView(false); // Reset the animation when out of view
      }
    });
  };

  // Set up IntersectionObserver to observe the images
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Trigger when 50% of the image is in view
    });

    const images = document.querySelectorAll(".pop-out-image");
    images.forEach((image) => observer.observe(image));

    return () => {
      images.forEach((image) => observer.unobserve(image));
    };
  }, []);

  return (
    <div className="flex justify-center items-center bg-[#78999e] ml-12 pl-20">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-bold text-black">What Our Clients Say</h2>
        <div className="flex items-center my-4">
          <span className="text-yellow-500 text-xl">★★★★★</span>
        </div>

        {/* Testimonials with Slide Effect */}
        <div
          className={`text-black mb-4 transition-transform duration-500 ease-in-out ${
            transitioning
              ? "transform translate-x-10 opacity-0"
              : "transform translate-x-0 opacity-100"
          }`}
        >
          {testimonials[currentIndex].text}
        </div>

        {/* Client Details */}
        <div className="flex items-center gap-3">
          <img
            src={testimonials[currentIndex].image}
            alt="User"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-bold text-black">
              {testimonials[currentIndex].name}
            </p>
            <p className="text-black text-sm">
              {testimonials[currentIndex].role}
            </p>
          </div>
        </div>
      </div>

      <div className="relative ml-10 max-w-md mx-auto rounded-lg overflow-hidden shadow-lg group transition-transform transform hover:scale-105">
        {/* Main House Image */}
        <img
          src="/images/test_apart.png"
          alt="House"
          className={`w-full h-96 object-cover rounded-lg shadow-lg transition-transform transform group-hover:scale-105 pop-out-image ${
            imageInView
              ? "scale-100 opacity-100 z-10"
              : "scale-75 opacity-0 z-0"
          }`}
        />

        {/* Interior Image */}
        <img
          src="/images/test_house.png"
          alt="Interior"
          className={`absolute bottom-0 right-0 border-4 border-white rounded-lg shadow-md transform translate-x-4 translate-y-4 scale-50 transition-all duration-300 ease-in-out group-hover:scale-75 pop-out-image ${
            imageInView
              ? "scale-100 opacity-100 z-20"
              : "scale-50 opacity-0 z-10"
          }`}
        />
      </div>
    </div>
  );
};

export default Testimonial;
