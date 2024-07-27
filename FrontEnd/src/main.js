import { getData } from "./getData.js";

const displayData = async () => {
  const data = await getData();
  const gallery = document.querySelector(".gallery");

  // Clear the existing static content
  gallery.innerHTML = "";

  // Create and append new elements based on fetched data
  data.forEach((item) => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.title;

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = item.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
  });
};

displayData();
