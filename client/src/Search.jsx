import { useState } from "react";

export default function Search({
  setSelectedDistrict,
  setSelectedPriceRange,
  setSelectedPropertyType,
}) {
  const [district, setDistrict] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    setSelectedDistrict(district);
    setSelectedPriceRange(priceRange);
    setSelectedPropertyType(propertyType);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-4">
      {/* District Dropdown */}
      <select
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        className="border p-2 rounded-lg w-full"
      >
        <option value="">Select District</option>
        <option value="Colombo">Colombo</option>
        <option value="Gampaha">Gampaha</option>
        <option value="Kandy">Kandy</option>
        <option value="Jaffna">Jaffna</option>
        <option value="Kurunegala">Kurunegala</option>
        <option value="Matara">Matara</option>
        <option value="Galle">Galle</option>
        <option value="Anuradhapura">Anuradhapura</option>
        <option value="Batticaloa">Batticaloa</option>
        <option value="Badulla">Badulla</option>
        <option value="Trincomalee">Trincomalee</option>
        <option value="Mannar">Mannar</option>
        <option value="Monaragala">Monaragala</option>
        <option value="Polonnaruwa">Polonnaruwa</option>
        <option value="Nuwara Eliya">Nuwara Eliya</option>
        <option value="Vavuniya">Vavuniya</option>
        <option value="Matale">Matale</option>
        <option value="Kilinochchi">Kilinochchi</option>
        <option value="Hambantota">Hambantota</option>
        <option value="Mullaitivu">Mullaitivu</option>
        <option value="Puttalam">Puttalam</option>
        <option value="Ratnapura">Ratnapura</option>
        <option value="Kegalle">Kegalle</option>
        <option value="Sabaragamuwa">Sabaragamuwa</option>
      </select>

      {/* Price Range Dropdown */}
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className="border p-2 rounded-lg w-full"
      >
        <option value="">Select Price Range</option>
        <option value="0-100000">0 - 100,000 LKR</option>
        <option value="100000-500000">100,000 - 500,000 LKR</option>
        <option value="500000-1000000">500,000 - 1,000,000 LKR</option>
        <option value="1000000">1,000,000+ LKR</option>
      </select>

      {/* Property Type Dropdown */}
      <select
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        className="border p-2 rounded-lg w-full"
      >
        <option value="">Select Property Type</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Land">Land</option>
        <option value="Office">Office</option>
      </select>

      {/* Search Button with Custom SVG Icon */}
      <button
        onClick={handleSearch}
        className="bg-white text-[#00032e]  p-2  w-full md:w-auto flex items-center justify-center gap-2"
      >
        {/* Custom SVG Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-9"
        >
          <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
