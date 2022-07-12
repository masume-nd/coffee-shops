import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
   accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
   //...other fetch options
});

const getCoffeStoresPhoto = async () => {
   const photos = await unsplashApi.search.getPhotos({
      query: "coffe shop",
      perPage: 40,
   });
   const unsplashResults = photos.response.results;
   return unsplashResults.map((result) => result.urls["small"]);
};
const getCoffeesUrl = (latLong, query, limit) => {
   return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};
export const fetchCoffeeStores = async (
   latLong = "36.330156904343994%2C59.52750387012035",
   limit=6
) => {
   const options = {
      method: "GET",
      crossDomain: false,
      headers: {
         Accept: "application/json",
         Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      },
   };
   const photos = await getCoffeStoresPhoto();
   const response = await fetch(
      getCoffeesUrl(latLong, "coffeeshop", limit),
      options
   );
   const data = await response.json();
   console.log(data.results);

   return data.results.map((venue, index) => {
      return {
         ...venue,
         imgUrl: photos[index],
      };
   });
};
