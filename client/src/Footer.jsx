import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#00032e] text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-4">
          © 2025 Your Company. All Rights Reserved.
        </p>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-[#edbf6d] transition duration-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#edbf6d] transition duration-300">
            Terms of Service
          </a>
          <a href="#" className="hover:text-[#edbf6d] transition duration-300">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
