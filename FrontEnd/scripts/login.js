document
  .querySelector(".loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.querySelector(".errorMessage");

    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token in localStorage (or cookies)
        localStorage.setItem("authToken", data.token);

        // Redirect to the projects page
        window.location.href = "./index.html";
      } else {
        // Display the error message if login fails
        errorMessage.textContent =
          data.message || "Mot de passe ou login incorrect.";
        errorMessage.style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
      errorMessage.textContent = "An error occurred. Please try again.";
      errorMessage.style.display = "block";
    }
  });
