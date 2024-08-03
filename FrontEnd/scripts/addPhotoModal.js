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

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const title = document.getElementById("formTitle").value;
    const categoryId = document.getElementById("category").value;
    const authToken = localStorage.getItem("authToken");

    if (fileInput.files.length === 0) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("categoryId", categoryId);
    formData.append("imageUrl", fileInput.files[0]);

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      console.log("Upload successful:", result);
      alert("Image uploaded successfully!");

      // Optionally reset the form after successful submission
      form.reset();
      customButton.textContent = "+ Ajouter photo";
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error uploading the image.");
    }
  });
};

const backToFirstModal = () => {
  const backToFirstModalButton = document.querySelector(".modal-back");

  backToFirstModalButton.addEventListener("click", function () {
    console.log("back to first modal button clicked");
    document.querySelector(".modal-wrapper1").style.display = "flex";
    document.querySelector(".modal-wrapper2").style.display = "none";
  });
};

export const initAddPhotoModal = () => {
  addPhotoForm();
  backToFirstModal();
};
