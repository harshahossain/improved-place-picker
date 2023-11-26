import { useState, useEffect } from "react";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    //fetching data.. via fetch()=is not provided by react but by the browser
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        // console.log(resData.places);
        setAvailablePlaces(resData.places); //this is basicaally from backend app.get('/places) where we get the places:placesData
      }); //sends get request by default//recieves a promise
    //but this approach causes the app to re-render causing infinite loop so we useEffect
    // const response = await fetch("http://localhost:3000/places"); ///modern syntax//need to make the function async to work with await but react doesnt support async Components
    //
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
