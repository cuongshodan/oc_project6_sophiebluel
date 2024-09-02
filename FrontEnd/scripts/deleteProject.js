export const deleteProject = () => {
  console.log("hello world 0 inside deleteProject");
  const deleteButtons = document.querySelectorAll(".deleteButton");
  const gallery = document.querySelector(".gallery");

  let deleteItems = [];

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const projectId = button.id;

      // Ask for confirmation before deletion
      const userConfirmed = window.confirm(
        `Are you sure you want to delete item nr ${projectId}? hello`
      );

      alert("Hello, World!");

      if (userConfirmed) {
        if (!deleteItems.includes(projectId)) {
          deleteItems.push(projectId);
          console.log(`Project with ID ${projectId} deleted successfully from the list`);
          console.log("hello world 1");
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
