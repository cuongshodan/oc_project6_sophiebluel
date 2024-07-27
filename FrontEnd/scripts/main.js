import { getData } from "./getData.js";
import { updateAuthLink } from "./updateAuthLink.js";
import { displayData } from "./displayData.js";
import { createFilterButtons } from "./createFilterButtons.js";

// Initial data fetch and setup
const setup = async () => {
  const data = await getData();
  createFilterButtons(data);
  displayData();
  updateAuthLink();
};

setup();
