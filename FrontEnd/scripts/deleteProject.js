export const deleteProject = async () => {
  const deleteButtons = document.querySelectorAll(".deleteButton");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("deleteProject ", button.id);
      // Here you can add your logic to delete the specific project
    });
  });
};
