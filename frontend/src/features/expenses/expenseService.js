import client from '../../api/client';

export const expenseService = {
  getDashboard: async () => {
    const res = await client.get("/expense/dashboard");
    return res.data;
  },
  getExpenses: async () => {
    const res = await client.get("/expense/");
    return res.data;
  },
  addExpense: async (data) => {
    const res = await client.post("/expense/", data);
    return res.data;
  },
  getInsights: async () => {
    const res = await client.get("/expense/insights");
    return res.data;
  },
  deleteExpense: async (id) => {
    const res = await client.delete(`/expense/${id}`);
    return res.data;
  }
};
