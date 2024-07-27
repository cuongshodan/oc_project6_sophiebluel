import { getData } from "./getData.js";
import { updateAuthLink } from "./updateAuthLink.js";
import { displayData } from "./displayData.js";
import {
  createFilterButtons,
  handleFilterClick,
} from "./createFilterButtons.js";

// Initial data fetch and setup
const setup = async () => {
  createFilterButtons();
  displayData(data);
  updateAuthLink();
};

setup();
