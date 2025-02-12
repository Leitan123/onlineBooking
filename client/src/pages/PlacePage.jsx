import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [allPhotos, setAllPhotos] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorite status from localStorage when the component mounts
  useEffect(() => {
    if (!id) return;

    // First, check if it's in localStorage
    const storedFavorite = localStorage.getItem(`favorite-${id}`);
    if (storedFavorite !== null) {
      setIsFavorite(JSON.parse(storedFavorite));
    } else {
      // Load place details
      axios.get(`/places/${id}`).then((response) => {
        setPlace(response.data);

        // Check if place is a favorite by making an API request
        axios
          .get(`/bookings/${id}`, { withCredentials: true })
          .then((favResponse) => {
            const isFav = favResponse.data.isFavorite;
            setIsFavorite(isFav);
            localStorage.setItem(`favorite-${id}`, JSON.stringify(isFav)); // Store in localStorage
          })
          .catch(() => {
            setIsFavorite(false); // Mark as not a favorite on error
          });
      });
    }
  }, [id]);

  // Function to remove from favorites and update localStorage
  async function removeFromFavorites(place) {
    try {
      const response = await axios.delete(`/bookings/${place._id}`, {
        withCredentials: true,
      });

      setIsFavorite(false); // Mark as not favorite
      localStorage.removeItem(`favorite-${place._id}`); // Remove from localStorage
      alert("Removed from Favorites!");
      console.log(response.data);
    } catch (error) {
      console.error("Error removing from favorites:", error);
      alert("Failed to remove from Favorites.");
    }
  }

  // Function to add to favorites and update localStorage
  async function addToFavorites(place) {
    try {
      const response = await axios.post(
        "/bookings",
        {
          placeId: place._id,
          title: place.title,
          address: place.address,
          photos: place.photos,
          description: place.description,
          perks: place.perks,
          extraInfo: place.extraInfo,
          mobile: place.mobile,
          mail: place.mail,
          price: place.price,
        },
        { withCredentials: true }
      );

      setIsFavorite(true); // Mark as favorite
      localStorage.setItem(`favorite-${place._id}`, JSON.stringify(true)); // Store in localStorage
      alert("Added to Favorites!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to Favorites.");
    }
  }

  useEffect(() => {
    if (!id) return;

    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (allPhotos) {
    return (
      <div className="absolute inset-0 bg-black min-w-full min-h-full">
        <div className="p-8 grid gap-4 bg-black">
          <div>
            <button
              onClick={() => setAllPhotos(false)}
              className="rounded p-2 flex items-center justify-center bg-white hover:bg-gray-200 transition-colors duration-300"
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
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img src={"http://localhost:4000/uploads/" + photo} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 mx-8 lg:mx-20 px-8 py-8 relative">
      <h1 className="text-2xl font-bold">{place.title}</h1>
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 mt-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        <a
          className="my-2 block font-semibold underline"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://maps.google.com/?q=${encodeURIComponent(
            place.address
          )}`}
        >
          {place.address}
        </a>
      </div>

      <div className="grid gap-2 grid-cols-3 lg:grid-cols-4 h-80 mt-4 relative">
        <div className="col-span-2 row-span-2 rounded-lg overflow-hidden">
          {place.photos?.[0] && (
            <img
              className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 hover:scale-110"
              src={`http://localhost:4000/uploads/${place.photos[0]}`}
              alt="Place"
            />
          )}
        </div>

        {place.photos?.[1] && (
          <div className="rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-lg aspect-square transform transition-transform duration-300 hover:scale-110"
              src={`http://localhost:4000/uploads/${place.photos[1]}`}
              alt="Place"
            />
          </div>
        )}

        {place.photos?.[2] && (
          <div className="rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 hover:scale-110"
              src={`http://localhost:4000/uploads/${place.photos[2]}`}
              alt="Place"
            />
          </div>
        )}

        {place.photos?.[3] && (
          <div className="rounded-lg overflow-hidden hidden lg:block">
            <img
              className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 hover:scale-110"
              src={`http://localhost:4000/uploads/${place.photos[3]}`}
              alt="Place"
            />
          </div>
        )}

        {place.photos?.[4] && (
          <div className="rounded-lg overflow-hidden hidden lg:block">
            <img
              className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 hover:scale-110"
              src={`http://localhost:4000/uploads/${place.photos[4]}`}
              alt="Place"
            />
          </div>
        )}

        <button
          onClick={() => setAllPhotos(true)}
          className="absolute shadow bottom-4 right-4 bg-white px-4 py-2 rounded flex gap-1"
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
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          More Photos
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <div>
            {place.perks?.length > 0 && (
              <div className="py-8 mt-5 rounded-2xl pt-2">
                <h2 className="font-semibold text-2xl mx-2">Perks</h2>
                <div className="grid grid-cols-2 gap-4 mx-2 mt-4">
                  {place.perks.map((perk, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white p-3 rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-green-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span className="text-gray-800">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="bg-white shadow p-4 rounded-2xl mt-4">
            <div className="text-4xl text-center">Price: {place.price} LKR</div>

            <div className="flex mt-2 gap-2">
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
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              <span>{place.mobile}</span>
            </div>

            <div className="flex mt-2 gap-1">
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>

              <a
                href={`mailto:${place.mail}`}
                className="text-blue-600 hover:underline"
              >
                {place.mail}
              </a>
            </div>

            <button
              onClick={() =>
                isFavorite ? removeFromFavorites(place) : addToFavorites(place)
              }
              className="w-full py-2 text-white rounded-lg bg-primary hover:bg-primary-dark mt-4"
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
      <div className=" items-center gap-2 bg-white p-3 rounded-lg ">
        <h2 className="font-semibold text-2xl">Extra Info</h2>
        <p className="text-sm text-gray-600">{place.extraInfo}</p>
      </div>
    </div>
  );
}
