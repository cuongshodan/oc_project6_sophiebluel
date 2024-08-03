const apiUrl = "http://localhost:5678/api/works";

const getData = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const updateAuthLink = async () => {
  const authLink = document.querySelector(".authLink");
  const token = localStorage.getItem("authToken");

  if (token) {
    authLink.textContent = "logout";
    authLink.href = "#"; // Remove link behavior for logout
    createModifyButton(); // Create modify button if logged in
    removeFilter(); // Ensure filter is removed if not logged in
  } else {
    authLink.textContent = "login";
    authLink.href = "./login.html"; // Link to login page
    removeModifyButton(); // Ensure modify button is removed if not logged in
  }

  authLink.addEventListener("click", (event) => {
    if (localStorage.getItem("authToken")) {
      event.preventDefault(); // Prevent default link behavior if logging out
      localStorage.removeItem("authToken");
      window.location.reload(); // Reload the page to reflect changes
      updateAuthLink(); // Update the link to login
    }
  });
};

const displayData = async (categoryFilter = "Tous") => {
  const data = await getData();
  const gallery = document.querySelector(".gallery");

  // Clear the existing content
  gallery.innerHTML = "";

  // Filter data based on category
  const filteredData =
    categoryFilter === "Tous"
      ? data
      : data.filter((item) => item.category.name === categoryFilter);

  // Create and append new elements based on filtered data
  filteredData.forEach((item) => {
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

const createModifyButton = () => {
  if (!document.getElementById("modifyButton")) {
    const button = document.createElement("a");
    const img = document.createElement("img");

    img.src = "./assets/icons/modify.svg";
    img.alt = "Modifier";
    img.style.marginRight = "8px";

    button.appendChild(img);
    button.id = "modifyButton";
    button.href = "#modal1";
    button.className = "js-modal";

    button.appendChild(document.createTextNode("modifier"));
    document.querySelector("#title").appendChild(button);
  }

  /* const button = document.querySelector(".js-modal");
    if (button) {
      button.style.display = "block"; // Change display property to block
    } */
};

const removeModifyButton = () => {
  const button = document.getElementById("modifyButton");
  if (button) {
    button.remove();
  }
};

const removeFilter = () => {
  const filter = document.querySelector(".filter");
  if (filter) {
    filter.remove();
  }
};

const createFilterButtons = async () => {
  const data = await getData();
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

let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let previouslyFocusedElement = null;

const openModal = async (e) => {
  console.log("Modal opening");
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  focusables[0].focus();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");

  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);

  // Prevent clicks inside the modal content from closing the modal
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = (e) => {
  console.log("Modal closing");
  if (modal === null) return;

  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();

  e.preventDefault();

  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);

  const hideModal = () => {
    modal.style.display = "none";
    modal.removeEventListener("animationend", hideModal);
    modal = null;
  };

  modal.addEventListener("animationend", hideModal);
};

const stopPropagation = (e) => {
  e.stopPropagation(); // This prevents closing the modal when clicking inside it
};

const initializeModal = async () => {
  document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
    }
    if (e.key === "Tab" && modal !== null) {
      focusInModal(e);
    }
  });
};

export const displayDataModal = async (categoryFilter = "Tous") => {
  const data = await getData();
  const gallery = document.querySelector(".galleryModal");

  // Clear the existing content
  gallery.innerHTML = "";

  data.forEach((item) => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    const deleteButton = document.createElement("img");

    img.src = item.imageUrl;
    img.alt = item.title;

    deleteButton.src = "./assets/icons/trashbin.svg";
    deleteButton.alt = "delete icon";
    deleteButton.className = "deleteButton";
    deleteButton.id = item.id;

    figure.appendChild(img);
    figure.appendChild(deleteButton);

    gallery.appendChild(figure);
  });
};

const deleteProject = async () => {
  const deleteButtons = document.querySelectorAll(".deleteButton");

  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No auth token found in localStorage.");
    return;
  }

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const projectId = button.id;

      console.log(`clicking project with ${projectId}`);

      try {
        const response = await fetch(
          `http://localhost:5678/api/works/${projectId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            redirect: 'follow',
            body: JSON.stringify({ key: 'value' }),
            mode: 'cors'
            
          }
        );

        if (response.ok) {
          console.log(`Project with ID ${projectId} deleted successfully`);
          // Remove the item from the DOM
          button.parentElement.remove();
        } else {
          console.error(
            `Failed to delete project with ID ${projectId}:`,
            response.statusText
          );
        }
      } catch (error) {
        console.error(`Error deleting project with ID ${projectId}:`, error);
      }
    });
  });
};

const projectInit = async () => {
  await displayData();
  await createFilterButtons();
  await updateAuthLink();
  await initializeModal();
  await displayDataModal();
  await deleteProject();
};

await projectInit();
