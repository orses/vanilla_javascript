/** sanitize function to clean up data on the client side */
const sanitize = word => {
  if (!word) return false;

  return word
    .toLowerCase()
    .trim()
    .replace(/[^a-z']/g, '');
};

export default sanitize;
