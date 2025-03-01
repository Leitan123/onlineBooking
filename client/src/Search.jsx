import { useState } from "react";

export default function Search() {
  const [selectedDistrict, setSelectedDistrict] = useState("Select District");
  const [selectedPriceRange, setSelectedPriceRange] =
    useState("Select Price Range");
  const [selectedPropertyType, setSelectedPropertyType] = useState(
    "Select Property Type"
  );

  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [isPriceRangeDropdownOpen, setIsPriceRangeDropdownOpen] =
    useState(false);
  const [isPropertyTypeDropdownOpen, setIsPropertyTypeDropdownOpen] =
    useState(false);

  const districts = [
    "Colombo",
    "Kandy",
    "Galle",
    "Jaffna",
    "Anuradhapura",
    "Nuwara Eliya",
    "Gampaha",
    "Matara",
    "Kurunegala",
  ];

  const priceRanges = ["Under 1M", "1M - 5M", "5M - 10M", "Above 10M"];

  const propertyTypes = ["Apartment", "House", "Land", "Commercial"];

  return (
    <div className="flex justify-center items-center gap-2 border bg-white rounded-full py-2 px-4 relative">
      {/* District Dropdown */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsDistrictDropdownOpen(!isDistrictDropdownOpen)}
      >
        <div>{selectedDistrict}</div>

        {isDistrictDropdownOpen && (
          <div
            className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
            onMouseEnter={() => setIsDistrictDropdownOpen(true)}
            onMouseLeave={() => setIsDistrictDropdownOpen(false)}
          >
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedDistrict("Select District");
                setIsDistrictDropdownOpen(false);
              }}
            >
              Select District
            </div>
            {districts.map((district, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedDistrict(district);
                  setIsDistrictDropdownOpen(false);
                }}
              >
                {district}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-gray-400">|</div>

      {/* Price Range Dropdown */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsPriceRangeDropdownOpen(!isPriceRangeDropdownOpen)}
      >
        <div>{selectedPriceRange}</div>

        {isPriceRangeDropdownOpen && (
          <div
            className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
            onMouseEnter={() => setIsPriceRangeDropdownOpen(true)}
            onMouseLeave={() => setIsPriceRangeDropdownOpen(false)}
          >
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedPriceRange("Select Price Range");
                setIsPriceRangeDropdownOpen(false);
              }}
            >
              Select Price Range
            </div>
            {priceRanges.map((range, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedPriceRange(range);
                  setIsPriceRangeDropdownOpen(false);
                }}
              >
                {range}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-gray-400">|</div>

      {/* Property Type Dropdown */}
      <div
        className="relative cursor-pointer"
        onClick={() =>
          setIsPropertyTypeDropdownOpen(!isPropertyTypeDropdownOpen)
        }
      >
        <div>{selectedPropertyType}</div>

        {isPropertyTypeDropdownOpen && (
          <div
            className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
            onMouseEnter={() => setIsPropertyTypeDropdownOpen(true)}
            onMouseLeave={() => setIsPropertyTypeDropdownOpen(false)}
          >
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedPropertyType("Select Property Type");
                setIsPropertyTypeDropdownOpen(false);
              }}
            >
              Select Property Type
            </div>
            {propertyTypes.map((type, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedPropertyType(type);
                  setIsPropertyTypeDropdownOpen(false);
                }}
              >
                {type}
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="bg-primary text-white p-1 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
}
