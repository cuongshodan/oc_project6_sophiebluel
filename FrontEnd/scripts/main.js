import { updateAuthLink } from "./updateAuthLink.js";
import { displayData } from "./displayData.js";
import { createFilterButtons } from "./createFilterButtons.js";
import { initializeModal } from "./modal.js";

// Initial data fetch and setup
const setup = async () => {
  await displayData();
  await createFilterButtons();
  await updateAuthLink();
  await initializeModal();
};

await setup();
