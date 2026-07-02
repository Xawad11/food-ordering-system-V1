import axios from "axios";

export const getUser = () => {
  return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
};

export const login = async (email, password) => {
  const { data } = await axios.post("/api/users/login", { email, password });
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const register = async (registerData) => {
  const { data } = await axios.post("/api/users/register", registerData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

// ✅ Fix: Added updateProfile function
export const updateProfile = async (profileData) => {
  const { data } = await axios.put("/api/users/updateProfile", profileData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

// ✅ Fix: Ensure changePassword exists
export const changePassword = async (passwords) => {
  await axios.put("/api/users/changePassword", passwords);
};

export const getAll = async (searchTerm = "") => {
  const { data } = await axios.get(`/api/users/getall/${searchTerm}`);
  return data;
};

export const toggleBlock = async (userId) => {
  const { data } = await axios.put(`/api/users/toggleBlock/${userId}`);
  return data;
};

export const getById = async (userId) => {
  const { data } = await axios.get(`/api/users/getById/${userId}`);
  return data;
};

// ✅ Fix: Ensure updateUser function exists
export const updateUser = async (userData) => {
  const { data } = await axios.put("/api/users/update", userData);
  return data;
};
