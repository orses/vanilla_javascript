import fetchJsonData from './utils/fetch_data.js';

const fetchFollowers = () => {
  const url = 'https://api.github.com/users/john-smilga/followers?per_page=100';
  const data = fetchJsonData(url);
  return data;
};

export default fetchFollowers;
