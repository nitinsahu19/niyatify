import axios from "axios";

export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      {
        emailId: email,
        password,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error(error.message);
  }
};
