import { UilPlusCircle } from "@iconscout/react-unicons";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCitiesContext } from "../hooks/useCitiesContext";
import { formatToLocalTime } from "../hooks/useWeatherData";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  const { user } = useAuthContext();
  const { cities, dispatch } = useCitiesContext();

  const [error, setError] = useState();
  const [cityName, setCityName] = useState();
  const [cityCountry, setCityCoutry] = useState();

  useEffect(() => {
    setCityName(name);
    setCityCoutry(country);
  }, [name, country]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to save cities!");
      return;
    }

    if (cities.length >= 5) {
      setError("You can only add 5 favorite cities!");
    } else {
      const city = { cityName, cityCountry };

      const response = await fetch(
        process.env.REACT_APP_PROXY + "/api/cities",
        {
          method: "POST",
          body: JSON.stringify(city),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        setError(null);
        dispatch({ type: "ADD_CITY", payload: json });
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-sm md:text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3 gap-3">
        <p className="text-white text-base md:text-3xl font-medium">
          {`${cityName}, ${cityCountry}`}
        </p>
        <button onClick={handleClick} className="text-white">
          <UilPlusCircle></UilPlusCircle>
        </button>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}

export default TimeAndLocation;
