require('dotenv').config();

const fetchWord = async word => {
  const API_KEY = process.env.DICTIONARY_API_KEY;
  const url = `https://owlbot.info/api/v4/dictionary/${word}`;

  try {
    const request = await fetch(url, {
      headers: new Headers({
        Authorization: `Token ${API_KEY}`,
      }),
    });

    const data = await request.json();

    if (data.definitions) return data;
    return false;
  } catch (error) {
    return false;
  }
};

export default fetchWord;
