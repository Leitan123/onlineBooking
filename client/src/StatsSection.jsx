import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  const stats = [
    { value: 850, label: "ELEGANT APARTMENTS" },
    { value: 950, label: "LUXURY HOUSES" },
    { value: 18000, label: "SATISFIED GUESTS" },
    { value: 2000, label: "HAPPY OWNERS" },
  ];

  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex justify-center items-center gap-24 bg-[#78999e] py-16"
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <motion.p
            className="text-4xl font-bold text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {visible ? (
              <Counter from={0} to={stat.value} />
            ) : (
              stat.value.toLocaleString() + "+"
            )}
          </motion.p>
          <p className="text-base text-black">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

// Counter Component for the Number Animation
const Counter = ({ from, to }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = from;
    const duration = 1500; // 1.5 seconds
    const increment = Math.ceil((to - from) / (duration / 16)); // Roughly 60 FPS

    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [from, to]);

  return <>{count.toLocaleString()}+</>;
};

export default StatsSection;
