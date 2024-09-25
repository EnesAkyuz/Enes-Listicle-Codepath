const SERVER_URL = '';

// Function to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const itemId = getQueryParam('id');

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
        document.getElementById('item-title').textContent = item.title;
        document.getElementById('item-author').innerHTML += item.author;
        document.getElementById('item-genre').innerHTML += item.genre;
        document.getElementById('item-image').src = item.imageUrl;
        document.getElementById('item-image').alt = item.title;
      }
    })
    .catch((error) => {
      console.error('Error fetching item:', error);
      window.location.href = '404.html';
    });
}