import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
});

const getUrlForCoffeeStore = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  const unsplashResult = photos.response.results;
  return unsplashResult.map((result) => result.urls["small"]);
};

export const fetchCoffeeStore = async (latLong = "43.653833032607096%2C-79.37896808855945",limit=7) => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    }
  };

  const response = await fetch(getUrlForCoffeeStore(
    latLong,
    'coffee stores'
    ,
    limit),
    options);

  const data = await response.json();
  const loc = data.results;
  console.log("data_y", photos.length);

  return data.results.map((result, idx) => {
    const neighbourhood = result.location.locality;
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighbourhood: neighbourhood,
      imgUrl: photos[idx], //(photos.lenght > 0) ? photos[idx] : null,
    };
  });
}