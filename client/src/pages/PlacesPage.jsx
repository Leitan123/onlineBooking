import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import PlaceForm from "../placeForm";

export default function PlacesPage() {
  const { action } = useParams();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

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

        <div>
          {action !== "new" && (
            <div className="text-center">
              list of added places
              <br />
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
          {action === "new" && (
            <div>
              <PlaceForm onSubmit={addNewPlace} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
