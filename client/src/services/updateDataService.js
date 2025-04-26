import axios from "axios";

export const postRequirements = async (requirements) => {
  const response = await axios.post(
    "http://localhost:8082/requirements",
    requirements
  );
  return response.data;
};

export const fetchRequirements = async () => {
  const response = await axios.get("http://localhost:8082/getRequirements");
  return response.data;
};
