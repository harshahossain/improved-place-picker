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

export async function updateUserPlaces(places) {
  //places must be attachble js obj by def isnt attachble here
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    // body: JSON.stringify(places),//not right format
    body: JSON.stringify({ places: places }), //cause it will try to extract the places property from the body in backend
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update user data");
  }
  return resData.message; //check backend, the put route
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json(); //wasnt executing the json with ()
  if (!response.ok) {
    //response.ok 200,300responses| !response.ok 400,500 codes
    throw new Error("Failed to fetch user places");
    //throw error
  }
  return resData.places;
}
