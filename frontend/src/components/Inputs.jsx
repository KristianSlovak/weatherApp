import { UilMapMarkerAlt, UilSearch } from "@iconscout/react-unicons";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
    setCity("");
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      setQuery({ q: city });
      setCity("");
    }
  };
  const handleUnitsChange = (e) => {
    const selectedUnit = { units: e.currentTarget.name };
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info(`Fetching users location.`);
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success(`Location fetched!`);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6 gap-5">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="search for city"
          className="placeholder:lowercase text-xs md:text-xl font-light p-2 w-2/3 shadow-xl focus:outline-none capitalize"
          onKeyDown={handleEnterPress}
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilMapMarkerAlt
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-lg md:text-xl text-white font-light hover:scale-125 transition ease-out"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-lg md:text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-lg md:text-xl text-white font-light hover:scale-125 transition ease-out"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
