async function fetchJsonData(url, init) {
  let deliver = false;
  try {
    const response = await fetch(url, init);

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
