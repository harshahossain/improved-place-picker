export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json(); //wasnt executing the json with ()
  if (!response.ok) {
    //response.ok 200,300responses| !response.ok 400,500 codes
    throw new Error("Failed to fetch places");
    //throw error
  }
  return resData.places;
}
