const addPhotoForm = () => {
    const fileInput = document.getElementById("photoUpload");
    const customButton = document.querySelector(".customButton");
    const form = document.querySelector(".formModal");
  
    customButton.addEventListener("click", function (event) {
      event.preventDefault();
      fileInput.click();
    });
  
    fileInput.addEventListener("change", function () {
      if (fileInput.files.length > 0) {
        customButton.textContent = fileInput.files[0].name;
      }
    });
  
    form.addEventListener("submit", async function (event) {
      console.log("formdata triggered");
      event.preventDefault();
  
      const title = document.getElementById("formTitle").value;
      const categoryElement = document.getElementById("category");
      const categoryId = parseInt(categoryElement.value, 10); // Convert to integer
      const token = localStorage.getItem("authToken");
  
      // Log to confirm categoryId is correctly converted
      console.log('Parsed categoryId value:', categoryId);
  
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
      formData.append("image", fileInput.files[0]);  // This should be binary and will be handled correctly by FormData
      formData.append("category", categoryId);  // Send as integer
  
      // Log FormData for debugging
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: ${value.name} (File of size ${value.size} bytes, type: ${value.type})`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }
  
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
