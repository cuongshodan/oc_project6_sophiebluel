export const deleteProject = () => {
  const deleteButtons = document.querySelectorAll(".deleteButton");

  let deleteItems = [];

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const projectId = button.id;

      if (!deleteItems.includes(projectId)) {
        deleteItems.push(projectId);
        console.log(`Project with ID ${projectId} deleted successfully`);
        // Remove the item from the DOM
        button.parentElement.remove();
      } else {
        console.log(`Project with ID ${projectId} is already deleted`);
      }

      console.log(deleteItems);
    });
  });
};
