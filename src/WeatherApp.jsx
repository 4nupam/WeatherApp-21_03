import React, { useEffect, useState } from "react";

export default function WeatherApp({ name }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetching() {
      try {
        let res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
        );

        if (!res.ok) {
          // ✅ Fixed condition
          throw new Error("Fetching problem");
        }

        let ans = await res.json();
        setData(ans); // ✅ Store parsed JSON in state
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }

    fetching();
  }, []); // ✅ Added dependency array to prevent infinite calls

  return (
    <div>
      <h1>This is my name {name}</h1>
      {data ? (
        <>
          <p>Temperature: {data.current?.temperature_2m}°C</p>
          <b>Latitude : {data.latitude}</b> <br />
          <b>Longitude: {data.longitude.toFixed(2)}</b>
          <p>Current Time: {data.current.time}</p>
          Elevation : {data.elevation}
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}
