import axios from "axios";

const baseUrl = "https://wttr.in";

const getSchema = (capital) => {
  const request = axios.get(`${baseUrl}/${capital}?format=j1`);
  return request.then((response) => response.data);
};

export default { getSchema };
