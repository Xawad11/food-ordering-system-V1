import axios from "axios";

export const createOrder = async (order) => {
  try {
    const { data } = await axios.post("/api/orders/create", order);
    return data;
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error for handling in the caller function
  }
};
