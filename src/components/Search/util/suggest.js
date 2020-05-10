async function suggest(searchText, apiKey) {
  if (searchText && searchText.length >= 8) {
    // the Mapbox API sends a request for each character you type, so we're limiting the starting
    // number to 8 to not make extraneous calls to the API.
    const request = fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
        searchText
      )}.json?access_token=${apiKey}`
    );

    const response = await request;
    if (response.ok) {
      const data = await response.json();
      const suggestions = data.features;
      return suggestions;
    }
    throw Error(response.statusText);
  } else {
    return false;
  }
}

export default suggest;
