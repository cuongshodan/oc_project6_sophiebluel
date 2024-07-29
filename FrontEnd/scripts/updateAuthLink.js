export const updateAuthLink = async () => {
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
