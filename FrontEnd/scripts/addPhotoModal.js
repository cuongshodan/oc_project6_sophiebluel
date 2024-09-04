const addPhotoForm = () => {
  const fileInput = document.getElementById("photoUpload");
  const customButton = document.querySelector(".customButton");
  const form = document.querySelector(".formModal");
  const uploadImg = document.querySelector(".uploadImg");
  const customButtonLabel = document.querySelector(".customButtonLabel1");
  const titleInput = document.getElementById("formTitle");
  const categorySelect = document.getElementById("category");
  const validateButton = document.querySelector(".validateButton");

  const checkFormValidity = () => {
    const title = titleInput.value.trim();
    const categoryId = parseInt(categorySelect.value, 10);
    const fileSelected = fileInput.files.length > 0;

    if (title && !isNaN(categoryId) && fileSelected) {
      validateButton.style.backgroundColor = "#1d6154";
    } else {
      validateButton.style.backgroundColor = ""; // Reset to default if conditions are not met
    }
  };

  customButton.addEventListener("click", function (event) {
    event.preventDefault();
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Check if the file size exceeds 4MB
      const maxSizeInMB = 4;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        alert("File size exceeds 4MB. Please upload a smaller file.");
        fileInput.value = ""; // Clear the file input
        return;
      }

      customButton.style.display = "none";
      customButtonLabel.style.display = "none";
      uploadImg.src = URL.createObjectURL(file);
    }

    checkFormValidity(); // Check validity when file is selected
  });

  titleInput.addEventListener("input", checkFormValidity); // Check validity when title is entered
  categorySelect.addEventListener("change", checkFormValidity); // Check validity when category is selected

  form.addEventListener("submit", async function (event) {
    console.log("formdata triggered");
    event.preventDefault();

    const title = titleInput.value;
    const categoryId = parseInt(categorySelect.value, 10); // Convert to integer
    const token = localStorage.getItem("authToken");

    // Ensure categoryId is a valid number
    if (isNaN(categoryId)) {
      alert("Invalid category ID");
      return;
    }

    // Ensure a file is selected
    if (fileInput.files.length === 0) {
      alert("Please upload an image.");
      return;
    }

    // Ensure title is not empty
    if (!title.trim()) {
      alert("Title cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", fileInput.files[0]); // This should be binary and will be handled correctly by FormData
    formData.append("category", categoryId); // Send as integer

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include token in header
        },
        body: formData, // Send formData directly
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
      validateButton.style.backgroundColor = ""; // Reset button color after form submission
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error uploading the image.");
    }
  });
};

const backToFirstModal = () => {
  const backToFirstModalButton = document.querySelector(".modal-back");

  backToFirstModalButton.addEventListener("click", function () {
    //console.log("back to first modal button clicked");
    document.querySelector(".modal-wrapper1").style.display = "flex";
    document.querySelector(".modal-wrapper2").style.display = "none";
  });
};

export const initAddPhotoModal = () => {
  addPhotoForm();
  backToFirstModal();
};
