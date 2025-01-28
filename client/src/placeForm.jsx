import { useState } from "react";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";

export default function PlaceForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    onSubmit({
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {preInput("Title", "Title for your place, should be short")}
      <input
        type="text"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        placeholder="Title"
      />

      {preInput("Address", "Address to this place")}
      <input
        type="text"
        value={address}
        onChange={(ev) => setAddress(ev.target.value)}
        placeholder="Address"
      />

      {preInput("Photos", "Add more photos for better details")}
      <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhoto} />

      {preInput("Description", "Provide a detailed description")}
      <textarea
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />

      {preInput("Perks", "Select all perks for this place")}
      <Perks selected={perks} onChange={setPerks} />

      {preInput("Extra Info", "Add any house rules or additional info")}
      <textarea
        value={extraInfo}
        onChange={(ev) => setExtraInfo(ev.target.value)}
      />

      {preInput(
        "Check In & Out Times, Max Guests",
        "Specify check-in, check-out times, and guest capacity"
      )}
      <div className="grid gap-2 sm:grid-cols-3">
        <div>
          <h3 className="mt-2 -mb-1">Check-in time</h3>
          <input
            type="text"
            value={checkIn}
            onChange={(ev) => setCheckIn(ev.target.value)}
            placeholder="14:00"
          />
        </div>
        <div>
          <h3 className="mt-2 -mb-1">Check-out time</h3>
          <input
            type="text"
            value={checkOut}
            onChange={(ev) => setCheckOut(ev.target.value)}
            placeholder="11:00"
          />
        </div>
        <div>
          <h3 className="mt-2 -mb-1">Max number of guests</h3>
          <input
            type="number"
            value={maxGuests}
            onChange={(ev) => setMaxGuests(ev.target.value)}
            placeholder="1"
          />
        </div>
      </div>

      <button className="primary my-4">Save</button>
    </form>
  );
}
