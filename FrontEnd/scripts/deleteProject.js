export const deleteProject = async () => {
  const deleteButtons = document.querySelectorAll(".deleteButton");

  // Get the token from localStorage
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No auth token found in localStorage.");
    return;
  }

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const projectId = button.id; // Retrieve the ID from the button
      console.log("Deleting project with ID:", projectId);

      try {
        const response = await fetch(
          `http://localhost:5678/api/works/${projectId}`,
          {
            method: "DELETE", // HTTP method for deleting a resource
            headers: {
              "Content-Type": "application/json", // Specify the content type
              Authorization: `Bearer ${token}`, // Add the Bearer token for authentication
            },
          }
        );

        if (response.ok) {
          console.log(`Project with ID ${projectId} deleted successfully`);
          // Optionally, remove the deleted item from the DOM
          button.parentElement.remove(); // This removes the figure element containing the button
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
