import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  console.log({ id });
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [mobile, setMobile] = useState("");
  const [mail, setMail] = useState("");
  const [price, setPrice] = useState(100);
  const [district, setDistrict] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [bgPosition, setBgPosition] = useState(0);

  useEffect(() => {
    if (!id) return; // Prevent API call if no id exists

    axios
      .get(`/places/${id}`)
      .then((response) => {
        console.log("API Response Data:", response.data); // Check API response
        const { data } = response;
        setTitle(data.title || "");
        setAddress(data.address || "");
        setAddedPhotos(data.photos || []);
        setDescription(data.description || "");
        setPerks(data.perks || []);
        setExtraInfo(data.extraInfo || "");
        setMobile(data.mobile || "");
        setMail(data.mail || "");
        setPrice(data.price || 100);
        setDistrict(data.district || "");
        setPropertyType(data.propertyType || "");
      })
      .catch((error) => console.error("Error fetching place:", error));
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setBgPosition(window.scrollY * -0.2); // Move the background in the opposite direction
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      mobile,
      mail,
      price,
      district,
      propertyType,
    };

    try {
      if (id) {
        // update
        await axios.put("/places", {
          id,
          ...placeData,
        });
        setSuccessMessage("Place updated successfully!");
      } else {
        // new place
        await axios.post("/places", placeData);
        setSuccessMessage("Place added successfully!");
      }

      // Automatically hide the message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
        setRedirect(true);
      }, 3000);
    } catch (error) {
      console.error("Error saving place:", error);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  // District options for Sri Lanka
  const districts = [
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Kandy",
    "Matale",
    "Nuwara Eliya",
    "Galle",
    "Matara",
    "Hambantota",
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Vavuniya",
    "Mullaitivu",
    "Batticaloa",
    "Ampara",
    "Trincomalee",
    "Polonnaruwa",
    "Anuradhapura",
    "Kurunegala",
    "Kegalle",
    "Ratnapura",
    "Badulla",
    "Monaragala",
    "Puttalam",
    "Mullaitivu",
  ];

  // Property types
  const propertyTypes = ["House", "Office", "Land", "Apartment"];

  return (
    <div
      className="p-4 bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: 'url("/images/form_bg.jpeg")',
        backgroundPosition: `center ${bgPosition}px`,
      }}
    >
      <AccountNav />

      {successMessage && (
        <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-center p-3 shadow-md z-50 flex items-center justify-center gap-2">
          <span>{successMessage}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      )}

      <form
        onSubmit={savePlace}
        className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg opacity-90"
      >
        <h2 className="text-2xl mt-4 text-black">Title</h2>
        <p className="text-gray-500 text-sm">
          Title for your place. Should be short and catchy as in advertisement.
        </p>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
        />

        <h2 className="text-2xl mt-4 text-black">Address</h2>
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
        />

        <h2 className="text-2xl mt-4 text-black">Photos</h2>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        <h2 className="text-2xl mt-4 text-black">Description</h2>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
        />

        <h2 className="text-2xl mt-4 text-black">Perks</h2>
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        <h2 className="text-2xl mt-4 text-black">Extra info</h2>
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
        />

        <h2 className="text-2xl mt-4 text-black">Contacts</h2>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Mobile</h3>
            <input
              type="text"
              value={mobile}
              onChange={(ev) => setMobile(ev.target.value)}
              placeholder="Enter mobile number"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">E-mail</h3>
            <input
              type="email"
              value={mail}
              onChange={(ev) => setMail(ev.target.value)}
              placeholder="Enter email"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
        </div>

        <h2 className="text-2xl mt-4 text-black">Price</h2>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
        </div>

        {/* District Dropdown */}
        <h2 className="text-2xl mt-4 text-black">District</h2>
        <select
          value={district}
          onChange={(ev) => setDistrict(ev.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
        >
          <option value="">Select district</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        {/* Property Type Dropdown */}
        <h2 className="text-2xl mt-4 text-black">Property Type</h2>
        <select
          value={propertyType}
          onChange={(ev) => setPropertyType(ev.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
        >
          <option value="">Select property type</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="mt-4 bg-[#edbf6d] text-[#00032e] hover:bg-[#d9a856] p-2 w-full rounded-2xl"
        >
          Save Place
        </button>
      </form>
    </div>
  );
}
