import { displayDataModal } from "./displayDataModal.js";
import { deleteFetch } from "./deleteFetch.js";

let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let previouslyFocusedElement = null;

let deleteItems = [];

const openModal = async (e) => {
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

  await displayDataModal(); // Load data into the modal
  addPhotoButton();
  deleteProject();
};

const closeModal = (e) => {
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
  console.log("Modal closing");
  deleteFetch(deleteItems);
};

const stopPropagation = (e) => {
  e.stopPropagation(); // This prevents closing the modal when clicking inside it
};

export const initializeModal = async () => {
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

const addPhotoButton = () => {
  const addPhotoButton = document.querySelector(".addPhotoButton");

  addPhotoButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Add photo button clicked");
  });
};

const deleteProject = () => {
  const deleteButtons = document.querySelectorAll(".deleteButton");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const projectId = button.id;

      // Ask for confirmation before deletion
      const userConfirmed = window.confirm(
        `Are you sure you want to delete item nr ${projectId}?`
      );

      if (userConfirmed) {
        if (!deleteItems.includes(projectId)) {
          deleteItems.push(projectId);
          console.log(`Project with ID ${projectId} deleted successfully`);
          // Remove the item from the DOM
          button.parentElement.remove();
        } else {
          console.log(`Project with ID ${projectId} is already deleted`);
        }

        console.log(deleteItems);
      } else {
        console.log(
          `Deletion of project ID ${projectId} was canceled by the user.`
        );
      }
    });
  });
};
