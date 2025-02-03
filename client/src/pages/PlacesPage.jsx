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

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  async function addNewPlace(placeData) {
    try {
      console.log("photos to save", placeData.addedPhotos);

      await axios.post("/places", placeData);

      // Set success message
      setSuccessMessage("Place saved successfully!");

      // Hide message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(""); // Clear the message
        navigate("/account/places");
      }, 1000); // 3 seconds
    } catch (error) {
      console.error("Error saving place:", error);
      // Optionally, handle the error here
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

          <div className="mt-4">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={"/account/places/" + place._id}
                  className="flex cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl"
                >
                  <div className="w-32 h-32 bg-gray-300">
                    {place.photos.length > 0 && (
                      <img src={place.photos[0]} alt="" />
                    )}
                  </div>
                  <div className="grow-0 shrink">
                    <h2 className="text-xl">{place.title}</h2>
                    <p className="text-sm mt-2">{place.description}</p>
                  </div>
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
