import { displayData } from "./displayData.js";

export const createFilterButtons = (data) => {
  const filterContainer = document.querySelector(".filter");
  const categories = new Set(data.map((item) => item.category.name));

  // Clear existing filter buttons (if any)
  filterContainer.innerHTML = "";

  // Create 'Tous' button
  const allButton = document.createElement("button");
  allButton.className = "active";
  allButton.innerText = "Tous";
  allButton.addEventListener("click", () => handleFilterClick("Tous"));
  filterContainer.appendChild(allButton);

  // Create category buttons
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerText = category;
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
