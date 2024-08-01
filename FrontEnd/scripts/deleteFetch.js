export const deleteFetch = async (projectItems) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No auth token found in localStorage.");
    return;
  }

  for (const projectId of projectItems) {
    try {
      const response = await fetch(
        `http://localhost:5678/api/works/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log(`Project with ID ${projectId} deleted successfully`);
      } else if (response.status === 404) {
        console.log(`Project with ID ${projectId} was already deleted`);
      } else {
        console.error(
          `Failed to delete project with ID ${projectId}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error deleting project with ID ${projectId}:`, error);
    }
  }
};
