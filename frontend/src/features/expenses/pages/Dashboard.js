import { useEffect, useState, useContext } from "react";
import { expenseService } from "../expenseService";
import { AuthContext } from "../../../context/AuthContext";
import Navbar from "../../../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import ExpenseForm from "../components/ExpenseForm";
import Insights from "../components/Insights";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [insightsData, setInsightsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  const fetchDashboard = async () => {
    try {
      setError(null);
      const [expensesData, summaryData, insights] = await Promise.all([
        expenseService.getExpenses(),
        expenseService.getDashboard(),
        expenseService.getInsights()
      ]);
      setExpenses(expensesData.sort((a, b) => b.id - a.id));
      setDashboardData(summaryData);
      setInsightsData(insights);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        logout();
      } else {
        setError("Failed to load dashboard data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await expenseService.deleteExpense(id);
      fetchDashboard();
    } catch (err) {
      alert("Failed to delete transaction.");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        {error && <div className="card mb-4" style={{ backgroundColor: 'var(--danger-light)' }}><p className="text-danger" style={{ fontWeight: '500' }}>{error}</p></div>}
        
        {loading ? (
          <div className="flex justify-center items-center" style={{ height: '200px' }}>
            <p className="text-muted" style={{ fontSize: '1.2rem', fontWeight: '500' }}>Loading your dashboard...</p>
          </div>
        ) : (
          <>
            <SummaryCards data={dashboardData} />
            
            <Insights data={insightsData} />
            
            <Charts data={dashboardData} />
            
            <div className="dashboard-grid main">
              <div>
                <div className="card card-plain" style={{ padding: '0', overflow: 'hidden' }}>
                  <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', backgroundColor: '#F9FAFB' }}>
                    <h3 style={{ margin: 0 }}>Recent Transactions</h3>
                  </div>
                  
                  {expenses.length === 0 ? (
                    <div className="flex" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
                      <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧾</span>
                      <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.5rem' }}>No transactions yet</h3>
                      <p className="text-muted">Add your first income or expense below.</p>
                    </div>
                  ) : (
                    <div>
                      {expenses.map((e) => (
                        <div key={e.id} className="transaction-item flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div style={{ 
                              width: '36px', height: '36px', borderRadius: '50%', 
                              backgroundColor: e.type === 'expense' ? 'var(--danger-light)' : 'var(--success-light)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'
                            }}>
                              {e.type === 'expense' ? '📉' : '📈'}
                            </div>
                            <div>
                              <p style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{e.category}</p>
                              <p className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'capitalize' }}>{e.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <h3 style={{ fontWeight: '700' }} className={e.type === 'expense' ? 'text-danger' : 'text-success'}>
                              {e.type === 'expense' ? '-' : '+'}₹{e.amount.toLocaleString()}
                            </h3>
                            <button 
                              onClick={() => handleDelete(e.id)} 
                              style={{ 
                                background: '#FEE2E2', border: '1px solid #FECACA', cursor: 'pointer', 
                                width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.9rem', transition: 'all 0.2s', marginLeft: '0.5rem'
                              }}
                              title="Delete"
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FECACA'}
                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <ExpenseForm onAdd={fetchDashboard} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
