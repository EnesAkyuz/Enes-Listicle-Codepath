const SERVER_URL = ''; // Assuming your server is hosted locally or remotely

// Function to fetch and display items
function fetchAndDisplayItems(query = '') {
  const trimmedQuery = query.trim();
  const url = trimmedQuery !== '' ? `/api/items/search?q=${encodeURIComponent(trimmedQuery)}` : '/api/items';
  console.log('Fetching URL:', url);

  fetch(url)
    .then((response) => response.json())
    .then((items) => {
      const grid = document.getElementById('items-grid');
      grid.innerHTML = ''; // Clear existing items

      if (items.length === 0) {
        grid.innerHTML = '<p>No books found.</p>';
        return;
      }

      items.forEach((item) => {
        const card = document.createElement('article');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${item.image_url}" alt="${item.title}" class="book-cover">
          <div class="card-content">
            <h2>${item.title}</h2>
            <p><strong>Author:</strong> ${item.author}</p>
            <p><strong>Genre:</strong> ${item.genre}</p>
            <p class="description"><strong>Description:</strong> ${item.description}</p>
            <a href="item.html?id=${item.id}" class="button">Read More</a>
          </div>
        `;
        grid.appendChild(card);
      });
    })
    .catch((error) => {
      console.error('Error fetching items:', error);
      alert('Failed to load items.');
    });
}

// Event listener for search form submission
document.getElementById('search-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form from reloading the page
  const query = document.getElementById('search-bar').value.trim();
  fetchAndDisplayItems(query);
});

// Initial fetch to display all items
fetchAndDisplayItems();
