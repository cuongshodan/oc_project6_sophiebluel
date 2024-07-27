const apiUrl = "http://localhost:5678/api/works";

export const getData = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
