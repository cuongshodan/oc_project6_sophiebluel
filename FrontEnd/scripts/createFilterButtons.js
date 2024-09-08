import { displayData } from "./displayData.js";
import { getData } from "./getData.js";

export const createFilterButtons = async () => {
  const [data, categoriesFromApi] = await Promise.all([
    getData(),
    fetch("http://localhost:5678/api/categories").then((res) => res.json()),
  ]);

  const filterContainer = document.querySelector(".filter");

  // Use Set to ensure uniqueness of categories
  const categories = new Set(
    categoriesFromApi.map((category) => category.name)
  );

  // Clear existing filter buttons (if any)
  filterContainer.innerHTML = "";

  // Create 'Tous' button
  const allButton = document.createElement("button");
  allButton.className = "active";
  allButton.innerText = "Tous";
  allButton.addEventListener("click", () => handleFilterClick("Tous"));
  filterContainer.appendChild(allButton);

  // Create unique category buttons
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerText = category; // `category` is already the unique name
    button.addEventListener("click", () => handleFilterClick(category));
    filterContainer.appendChild(button);
  });
};

export const handleFilterClick = (category) => {
  // Update active button
  document.querySelectorAll(".filter button").forEach((button) => {
    button.classList.remove("active");
    if (button.innerText === category) {
      button.classList.add("active");
    }
  });

  // Display data for the selected category
  displayData(category);
};
