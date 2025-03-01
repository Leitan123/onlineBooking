import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AccountNav from "../AccountNav";

export default function Favorites() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  // Fetch user's favorite places
  useEffect(() => {
    axios
      .get("/bookings")
      .then(({ data }) => {
        setFavorites(data);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }, []);

  return (
    <div className="relative">
      <AccountNav />
      <div>
        <div className="mt-4">
          {favorites.length > 0 ? (
            favorites.map((place) => (
              <Link
                to={`/account/bookings/${place.place._id}`}
                key={place._id}
                className="flex cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl mb-2"
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
              </Link>
            ))
          ) : (
            <div className="text-center text-lg">No favorite places found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
