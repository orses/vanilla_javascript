<<<<<<< HEAD
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
=======
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
>>>>>>> 8214b560d7a6b0eca37d02a19be1f25d87d015b1
