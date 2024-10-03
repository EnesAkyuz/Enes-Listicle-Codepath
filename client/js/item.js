const SERVER_URL = ''; // Assuming your server is hosted locally or remotely

// Function to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const itemId = getQueryParam('id'); // Get the item ID (UUID) from the query params

if (!itemId) {
  // Redirect to 404 page if no id is provided
  window.location.href = '404.html';
} else {
  fetch(`${SERVER_URL}/api/items/${itemId}`)
    .then((response) => response.json())
    .then((item) => {
      if (item.error) {
        window.location.href = '404.html';
      } else {
        // Display the item details on the page
        document.getElementById('item-title').textContent = item.title;
        document.getElementById('item-author').innerHTML = `<strong>Author:</strong> ${item.author}`;
        document.getElementById('item-genre').innerHTML = `<strong>Genre:</strong> ${item.genre}`;
        document.getElementById('item-image').src = item.image_url;
        document.getElementById('item-image').alt = item.title;
        document.getElementById('item-description').textContent = item.description;
      }
    })
    .catch((error) => {
      console.error('Error fetching item:', error);
      window.location.href = '404.html';
    });
}
