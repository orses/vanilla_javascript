async function fetchJsonData(url) {
  let deliver = false;
  try {
    const response = await fetch(url);

    if (response.ok) {
      const responseData = await response.json();
      deliver = responseData;
    }
  } catch (err) {
    deliver = false;
  }

  return deliver;
}

export default fetchJsonData;
