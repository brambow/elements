async function geocode(searchText, apiKey) {
  const request = fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
      searchText
    )}.json?access_token=${apiKey}`
  );

  const response = await request;
  if (response.ok) {
    const data = await response.json();
    const topMatch = data.features[0];
    const geocodingResult = {
      id: topMatch.id,
      placeName: topMatch.place_name,
      matchScore: topMatch.relevance,
      accuracy: topMatch.properties.accuracy,
      coordinates: topMatch.center // [longitude, latitude]
    };

    return geocodingResult;
  }
  throw Error(response.statusText);
}

export default geocode;
