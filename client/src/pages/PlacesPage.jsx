import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import PlaceForm from "./PlacesFormPage";
import AccountNav from "../AccountNav";
import PlacesFormPage from "./PlacesFormPage";

export default function PlacesPage() {
  const { action } = useParams();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    axios
      .get("/places")
      .then(({ data }) => {
        setPlaces(data);
        setLoading(false); // Data fetched, stop loading
      })
      .catch(() => {
        setLoading(false); // Stop loading on error
      });
  }, []);

  async function addNewPlace(placeData) {
    try {
      console.log("photos to save", placeData.addedPhotos);

      await axios.post("/places", placeData);

      setSuccessMessage("Place saved successfully!");

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/account/places");
      }, 1000); // 1 second
    } catch (error) {
      console.error("Error saving place:", error);
    }
  }

  async function deletePlace(placeId) {
    try {
      await axios.delete(`/places/${placeId}`);
      setPlaces(places.filter((place) => place._id !== placeId));
      setSuccessMessage("Place deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 1000);
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  }

  return (
    <>
      <div className="relative">
        {successMessage && (
          <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-center p-2 shadow-md transition-opacity duration-500">
            {successMessage}
          </div>
        )}
        <AccountNav />

        <div>
          {action !== "new" && (
            <div className="text-center">
              <Link
                className="inline-flex gap-1 bg-primary text-white py-4 px-6 rounded-full"
                to={"/account/places/new"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add new place
              </Link>
            </div>
          )}

          {/* Show loading WebM video if data is being fetched */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <video
                src="/images/load.webm" // Replace with the correct path to your WebM video
                autoPlay
                loop
                muted
                className="w-64 h-64"
              />
            </div>
          )}

          <div className="mt-4">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={"/account/places/" + place._id}
                  className="flex cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl mb-2"
                  key={place._id}
                >
                  <div className="flex w-32 h-32 bg-gray-300 flex-shrink-0">
                    {place.photos.length > 0 && (
                      <img
                        src={"http://localhost:4000/uploads/" + place.photos[0]}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="grow">
                    <h2 className="text-xl">{place.title}</h2>
                    <p className="text-sm mt-2">{place.description}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deletePlace(place._id);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 self-start"
                  >
                    Delete
                  </button>
                </Link>
              ))}
          </div>

          {action === "new" && (
            <div>
              <PlacesFormPage onSubmit={addNewPlace} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
