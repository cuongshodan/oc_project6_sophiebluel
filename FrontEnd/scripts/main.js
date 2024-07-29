import { getData } from "./getData.js";
import { updateAuthLink } from "./updateAuthLink.js";
import { displayData } from "./displayData.js";
import { createFilterButtons } from "./createFilterButtons.js";
import { initializeModal } from './modal.js';

// Initial data fetch and setup
const setup = async () => {
  const data = await getData();
  createFilterButtons(data);
  await displayData();
  updateAuthLink();
  initializeModal();
};

setup();
