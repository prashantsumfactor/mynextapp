import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_API_KEY,
});

const getUrlForCoffeeStore = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 10,
  });
  const unsplashResult = photos.response.results;
  // console.log({unsplashResult});
  return unsplashResult.map((result)=> result.urls["small"]);
};

export const fetchCoffeeStore = async () => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    }
  };

  const response = await fetch(getUrlForCoffeeStore('43.653833032607096%2C-79.37896808855945', 'coffee', 8), options);
  const data = await response.json();
  return data.results.map((result, idx) => {
    return {
        ...result,
        imgUrl : photos[idx],
    };
  });
}