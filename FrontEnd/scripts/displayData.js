import { getData } from './getData.js';

export const displayData = async (categoryFilter = 'Tous') => {
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