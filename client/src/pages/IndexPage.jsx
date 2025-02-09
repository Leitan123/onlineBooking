import { Link } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/index-places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id}>
            <div className="rounded-2xl overflow-hidden relative group">
              {place.photos?.[0] && (
                <img
                  className="w-full aspect-square object-cover rounded-2xl transform transition-transform duration-300 group-hover:scale-110"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="text-sm">{place.title}</h2>
            <h3 className="font-bold text-gray-500">{place.address}</h3>
            <div className="mt-2">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}
