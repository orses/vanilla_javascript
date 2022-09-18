async function fetchJSONData(url) {
  let deliver = false;
  try {
    const request = await fetch(url);
    if (request.ok) {
      deliver = await request.json();
    }
  } catch (error) {
    deliver = false;
  }

  return deliver;
}

export default fetchJSONData;
