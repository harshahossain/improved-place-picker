import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [err, setErr] = useState(false);

  // useEffect(() => {
  //   //fetching data.. via fetch()=is not provided by react but by the browser
  //   fetch("http://localhost:3000/places")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((resData) => {
  //       // console.log(resData.places);
  //       setAvailablePlaces(resData.places); //this is basicaally from backend app.get('/places) where we get the places:placesData
  //     }); //sends get request by default//recieves a promise
  //   //but this approach causes the app to re-render causing infinite loop so we useEffect
  //   // const response = await fetch("http://localhost:3000/places"); ///modern syntax//need to make the function async to work with await but react doesnt support async Components
  //   //
  // }, []);

  //async version
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        //fetching data with navigator built into the browser
        navigator.geolocation.getCurrentPosition((position) => {
          //fetches user's current location
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
        //
      } catch (error) {
        setErr({
          message: error.message || "Could not fetch places, please try again",
        });
        //... handing error
        setIsFetching(false);
      }
    }
    //gotta execute fetchPlaces thouggh
    fetchPlaces();
  }, []);
  if (err) {
    return <Error title="An error occurred" message={err.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoaading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
