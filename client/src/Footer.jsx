import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a2c39] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-[#edbf6d]">REALAR</span>
            <span className="text-gray-400 text-sm">LIVING SOLUTIONS</span>
          </h2>
          <p className="text-gray-400 mt-3 leading-relaxed">
            Elevate your lifestyle with our seamless property solutions.
            Discover the best living spaces, tailored just for you.
          </p>
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="text-gray-400 hover:text-[#edbf6d] transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#edbf6d] transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#edbf6d] transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#edbf6d] transition"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-[#edbf6d]">Contact Us</h3>
          <p className="text-gray-400 mt-3">
            789 Inner Lane, Holy Park, California, USA
          </p>
          <p className="text-gray-400">+00 123 456 7890</p>
          <p className="text-gray-400">+00 987 654 3210</p>
          <p className="text-gray-400">info@mailrealar@gmail.com</p>
          <p className="text-gray-400">supportmail01@gmail.com</p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#edbf6d]">Useful Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                › All Properties
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                › All Authors
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                › Our Team
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                › Our Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                › Our Products
              </a>
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold text-[#edbf6d]">Explore</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                › All Properties
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                › All Authors
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                › Our Team
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                › Our Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                › Our Products
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between text-gray-500 text-sm">
        <p>© 2024 Realar. All rights reserved.</p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <a href="#" className="hover:text-white transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
