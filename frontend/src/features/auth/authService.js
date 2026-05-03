import client from '../../api/client';

export const authService = {
  login: async (email, password) => {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);
    const res = await client.post("/auth/login", formData);
    return res.data;
  },
  signup: async (email, password) => {
    const res = await client.post("/auth/signup", { email, password });
    return res.data;
  }
};
