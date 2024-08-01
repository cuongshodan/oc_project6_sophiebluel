export const deleteProject = () => {
  const deleteButtons = document.querySelectorAll(".deleteButton");

  let deleteItems = [];

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const projectId = button.id;

      // Ask for confirmation before deletion
      const userConfirmed = window.confirm(`Are you sure you want to delete item nr ${projectId}?`);

      alert("Hello, World!");

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
        console.log(`Deletion of project ID ${projectId} was canceled by the user.`);
      }
    });
  });
};
