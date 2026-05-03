import { useState } from 'react';
import { expenseService } from '../expenseService';

export default function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !category) return;
    
    setLoading(true);
    try {
      await expenseService.addExpense({
        amount: parseFloat(amount),
        category,
        type
      });
      setAmount("");
      setCategory("");
      onAdd();
    } catch (err) {
      alert("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <h3 className="mb-4">Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Amount (₹)</label>
          <input type="number" className="input-field" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>
        <div className="input-group">
          <label className="input-label">Category</label>
          <input type="text" className="input-field" placeholder="e.g. Food, Rent" value={category} onChange={e => setCategory(e.target.value)} required />
        </div>
        <div className="input-group">
          <label className="input-label">Type</label>
          <select className="input-field" value={type} onChange={e => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}
