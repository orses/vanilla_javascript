/** sanitize function to clean up data on the client side */
const sanitize = word => {
  if (!word) return false;

  const wordTemp = word
    .toLowerCase()
    .trim()
    .replace(/[^a-z']/g, '');

  return wordTemp;
};

export default sanitize;
