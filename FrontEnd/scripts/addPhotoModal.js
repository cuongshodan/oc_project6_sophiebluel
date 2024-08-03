export const addPhotoForm = () => {
  const fileInput = document.getElementById("photoUpload");
  const customButton = document.querySelector(".customButton");

  customButton.addEventListener("click", function () {
    console.log("addform button clicked");
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      customButton.textContent = fileInput.files[0].name;
    }
  });
};
