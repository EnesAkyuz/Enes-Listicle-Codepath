fetch(`/api/items`)
  .then((response) => response.json())
  .then((items) => {
    const grid = document.getElementById('items-grid');
    items.forEach((item) => {
      const card = document.createElement('article');
      card.innerHTML = `
        <a href="item.html?id=${item.id}">
          <img src="${item.imageUrl}" alt="${item.title}">
          <h2>${item.title}</h2>
          <p><strong>Author:</strong> ${item.author}</p>
          <p><strong>Genre:</strong> ${item.genre}</p>
        </a>
      `;
      grid.appendChild(card);
    });
  })
  .catch((error) => {
    console.error('Error fetching items:', error);
    alert('Failed to load items.');
  });
