import { getData } from "./getData.js";

export const displayDataModal = async (categoryFilter = "Tous") => {
  const data = await getData();
  const gallery = document.querySelector(".galleryModal");

  // Clear the existing content
  gallery.innerHTML = "";


  data.forEach((item) => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.title;

    /* const figcaption = document.createElement("figcaption"); */
    /* figcaption.innerText = item.title; */

    figure.appendChild(img);
    /* figure.appendChild(figcaption); */

    gallery.appendChild(figure);
  });
};
