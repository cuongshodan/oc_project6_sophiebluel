const apiUrl = "http://localhost:5678/api/works";

let counter = 0;

export const getData = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      counter++;
      console.log(`getData called ${counter} times`);
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
