/** sanitize function to clean up data on the client side */
const sanitize = word => {
  if (!word) return false;

  return word
    .toLowerCase()
    .trim()
    .replace(/[^a-z\d]/g, '');
};

function removeHtmlTags(data) {
  return data.replace(/<\/?\w+?>/g, '');
}

export { removeHtmlTags, sanitize };
