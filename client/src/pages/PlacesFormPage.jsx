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
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
        setCheckIn(data.checkIn || "");
        setCheckOut(data.checkOut || "");
        setMaxGuests(data.maxGuests || 1);
        setPrice(data.price || 100);
      })
      .catch((error) => console.error("Error fetching place:", error));
  }, [id]);

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
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

  return (
    <div>
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

      <form onSubmit={savePlace}>
        <h2 className="text-2xl mt-4">Title</h2>
        <p className="text-gray-500 text-sm">
          Title for your place. Should be short and catchy as in advertisement.
        </p>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
        />

        <h2 className="text-2xl mt-4">Address</h2>
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />

        <h2 className="text-2xl mt-4">Photos</h2>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        <h2 className="text-2xl mt-4">Description</h2>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        <h2 className="text-2xl mt-4">Perks</h2>
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        <h2 className="text-2xl mt-4">Extra info</h2>
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />

        <h2 className="text-2xl mt-4">Check-in & Check-out times</h2>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check-in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check-out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
