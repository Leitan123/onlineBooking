import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [AllPhotos, setAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (AllPhotos) {
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
      <div className="my-4">
        <h2 className="font-semibold text-2xl">Description</h2>
        {place.description}
      </div>
      <div className="grid grid-cols-2">
        <div>
          check-in: {place.checkIn}
          <br />
          check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <div className="bg-white shadow p-4 -mt-12 rounded-2xl ">
            <div className="text-4xl text center">
              Price: {place.price} / per night
            </div>
            <div>
              <label htmlFor="Check In:"></label>
              <input type="date" />
            </div>
            <button className="primary mb-3 mt-3">Add to favourites</button>
            <button className="primary">Contact Us</button>
          </div>
        </div>
      </div>
      <div className="bg-white -mx-5 py-8 mt-5 rounded-2xl pt-2">
        <div>
          <h2 className="font-semibold text-2xl mx-2">Extra Info</h2>
        </div>
        <div className="my-4 mt-1 text-sm text-gray-700 leading-4 mx-2">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
