const addPhotoForm = () => {
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

const backToFirstModal = () => {
  const backToFirstModalButton = document.querySelector(
    ".modal-back"
  );

  backToFirstModalButton.addEventListener("click", function () {
    console.log("back to first modal button clicked");
    document.querySelector(".modal-wrapper1").style.display = "flex";
    document.querySelector(".modal-wrapper2").style.display = "none";
  });
};


export const initAddPhotoModal = () => {
  addPhotoForm();
  backToFirstModal();
}