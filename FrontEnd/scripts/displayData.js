import { getData } from "./getData.js";

export const displayData = async (categoryFilter = "Tous") => {
  try {
    // Fetch data and categories
    const [data, categories] = await Promise.all([
      getData(),
      fetch("http://localhost:5678/api/categories").then((res) => res.json()),
    ]);

    const gallery = document.querySelector(".gallery");

    // Clear the existing content
    gallery.innerHTML = "";

    // Find the selected category ID
    const selectedCategory = categories.find(
      (category) => category.name === categoryFilter
    );

    // Filter data based on the selected category
    const filteredData =
      categoryFilter === "Tous"
        ? data
        : data.filter(
            (item) => item.categoryId === (selectedCategory?.id || null)
          );

    if (filteredData.length === 0) {
      gallery.innerHTML = "<p>No items match this category.</p>";
      return;
    }

    // Create and append new elements based on filtered data
    filteredData.forEach((item) => {
      const figure = document.createElement("figure");

      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.title;
      img.id = item.id;

      const figcaption = document.createElement("figcaption");
      figcaption.innerText = item.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);

      gallery.appendChild(figure);
    });
  } catch (error) {
    console.error("Error fetching data or categories:", error);
    gallery.innerHTML = "<p>Failed to load data. Please try again later.</p>";
  }
};
