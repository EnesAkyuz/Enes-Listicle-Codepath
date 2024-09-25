fetch(`/api/items`)
  .then((response) => response.json())
  .then((items) => {
    const grid = document.getElementById('items-grid');
    items.forEach((item) => {
      const card = document.createElement('article');
      card.classList.add('card'); // Add a class for styling
      card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.title}" class="book-cover">
        <div class="card-content">
          <h2>${item.title}</h2>
          <p><strong>Author:</strong> ${item.author}</p>
          <p><strong>Genre:</strong> ${item.genre}</p>
          <p class="description"><strong>Description:</strong> ${item.description}</p>
          <a href="item.html?id=${item.id}" class="button">Read More</a> <!-- Read More button -->
        </div>
      `;
      grid.appendChild(card);
    });
  })
  .catch((error) => {
    console.error('Error fetching items:', error);
    alert('Failed to load items.');
  });
