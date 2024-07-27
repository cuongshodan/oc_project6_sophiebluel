export const updateAuthLink = () => {
  const authLink = document.querySelector(".authLink");
  const token = localStorage.getItem("authToken");

  if (token) {
    authLink.textContent = "logout";
    authLink.href = "#"; // Remove link behavior for logout
    document.getElementById("modifyButton").style.display = "block";
  } else {
    authLink.textContent = "login";
    authLink.href = "./login.html"; // Link to login page
    document.getElementById("modifyButton").style.display = "none";
  }

  authLink.addEventListener("click", (event) => {
    if (localStorage.getItem("authToken")) {
      event.preventDefault(); // Prevent default link behavior if logging out
      localStorage.removeItem("authToken");
      updateAuthLink(); // Update the link to login
    }
  });
};

// Initial update of the auth link based on the presence of token
updateAuthLink();
