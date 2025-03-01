import { useState, useEffect } from "react";

const TypewriterEffect = () => {
  const types = ["Apartment", "House", "Land", "Office"];

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === types[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % types.length); // Move to next word
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      },
      isDeleting ? 50 : 100
    ); // Typing speed

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index, types]);

  return (
    <span className="text-yellow-400">
      {types[index].substring(0, subIndex)}
      <span className="animate-blink text-white">|</span>
    </span>
  );
};

export default TypewriterEffect;
