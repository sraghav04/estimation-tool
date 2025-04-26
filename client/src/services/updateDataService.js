import axios from "axios";

export const postRequirements = async (requirements) => {
  const response = await axios.post(
    "http://localhost:8082/requirements",
    requirements
  );
  return response.data;
};
