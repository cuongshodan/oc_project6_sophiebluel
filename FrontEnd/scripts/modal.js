import { displayDataModal } from "./displayDataModal.js";
import { deleteFetch } from "./deleteFetch.js";
import { initAddPhotoModal } from "./addPhotoModal.js";

let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let previouslyFocusedElement = null;

let deleteItems = [];

const openModal = async (e) => {
  e.preventDefault();

  const targetModal = e.target.getAttribute("href");

  modal = document.querySelector(targetModal);
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  focusables[0].focus();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");

  modal.addEventListener("click", closeModal);

  modal.querySelectorAll(".js-modal-close").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  // Prevent clicks inside the modal content from closing the modal

  modal.querySelectorAll(".js-modal-stop").forEach((element) => {
    element.addEventListener("click", stopPropagation);
  });

  await displayDataModal(); // Load data into the modal if it's #modal1
  deleteProject(); // Initialize delete functionality if it's #modal1
  addPhotoButton();
  initAddPhotoModal();
  
};

const closeModal = (e) => {
  if (modal === null) return;

  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();

  e.preventDefault();

  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  // Loop through all elements with the class "js-modal-close" and remove the event listener
  modal.querySelectorAll(".js-modal-close").forEach((element) => {
    element.removeEventListener("click", closeModal);
  });

  // Loop through all elements with the class "js-modal-stop" and remove the event listener
  modal.querySelectorAll(".js-modal-stop").forEach((element) => {
    element.removeEventListener("click", stopPropagation);
  });

  const hideModal = () => {
    modal.style.display = "none";
    modal.removeEventListener("animationend", hideModal);
    /* modal = null; */
  };

  modal.addEventListener("animationend", hideModal);
  console.log("Modal closing");
  deleteFetch(deleteItems);
};

// Add event listener to the "Ajouter une photo" button to close #modal1 and open #modal2

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
    console.log("Add photo button clicked");

    document.querySelector(".modal-wrapper1").style.display = "none";
    document.querySelector(".modal-wrapper2").style.display = "flex";
  });
};

const deleteProject = () => {
  const deleteButtons = document.querySelectorAll(".deleteButton");
  const gallery = document.querySelector(".gallery");

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
           // Find the figure containing the img with the specific ID
           const figureToRemove = gallery
           .querySelector(`figure img[id="${projectId}"]`)
           ?.closest("figure");
         console.log("hello world 2");
         console.log("******here===> ", figureToRemove);

         // Remove the figure from the DOM
         if (figureToRemove) {
           figureToRemove.remove();
           console.log(`Figure with ID ${projectId} removed successfully`);
         } else {
           console.log(`No figure found with an img having ID ${projectId}`);
         }
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
