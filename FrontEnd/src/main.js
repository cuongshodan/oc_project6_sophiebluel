import { getData } from './getData.js';

const displayData = async (categoryFilter = 'Tous') => {
  const data = await getData();
  const gallery = document.querySelector('.gallery');

  // Clear the existing content
  gallery.innerHTML = '';

  // Filter data based on category
  const filteredData = categoryFilter === 'Tous' ? data : data.filter(item => item.category.name === categoryFilter);

  // Create and append new elements based on filtered data
  filteredData.forEach(item => {
    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;

    const figcaption = document.createElement('figcaption');
    figcaption.innerText = item.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
  });
};

const createFilterButtons = (data) => {
  const filterContainer = document.querySelector('.filter');
  const categories = new Set(data.map(item => item.category.name));

  // Clear existing filter buttons (if any)
  filterContainer.innerHTML = '';

  // Create 'Tous' button
  const allButton = document.createElement('button');
  allButton.className = 'active';
  allButton.innerText = 'Tous';
  allButton.addEventListener('click', () => handleFilterClick('Tous'));
  filterContainer.appendChild(allButton);

  // Create category buttons
  categories.forEach(category => {
    const button = document.createElement('button');
    button.innerText = category;
    button.addEventListener('click', () => handleFilterClick(category));
    filterContainer.appendChild(button);
  });
};

const handleFilterClick = (category) => {
  // Update active button
  document.querySelectorAll('.filter button').forEach(button => {
    button.classList.remove('active');
    if (button.innerText === category) {
      button.classList.add('active');
    }
  });

  // Display data for the selected category
  displayData(category);
};

// Initial data fetch and setup
const setup = async () => {
  const data = await getData();
  createFilterButtons(data);
  displayData();
};

setup();
