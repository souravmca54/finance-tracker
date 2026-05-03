export default function SummaryCards({ data }) {
  if (!data) return null;

  return (
    <div className="dashboard-grid summary">
      <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', position: 'relative' }}>
        <span style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', fontSize: '1.5rem' }}>💰</span>
        <p className="input-label mb-2" style={{ color: 'var(--text-muted)' }}>Total Balance</p>
        <h2 style={{ fontSize: '2.2rem', letterSpacing: '-1px', marginTop: '0.5rem' }}>₹{data.balance.toLocaleString()}</h2>
      </div>
      
      <div className="card" style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)', border: '1px solid #A7F3D0', position: 'relative' }}>
        <span style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', fontSize: '1.5rem' }}>📈</span>
        <p className="input-label mb-2" style={{ color: 'var(--success-dark)' }}>Total Income</p>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--success-dark)', letterSpacing: '-1px', marginTop: '0.5rem' }}>₹{data.total_income.toLocaleString()}</h2>
      </div>
      
      <div className="card" style={{ background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)', border: '1px solid #FECACA', position: 'relative' }}>
        <span style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', fontSize: '1.5rem' }}>📉</span>
        <p className="input-label mb-2" style={{ color: 'var(--danger-dark)' }}>Total Expense</p>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--danger-dark)', letterSpacing: '-1px', marginTop: '0.5rem' }}>₹{data.total_expense.toLocaleString()}</h2>
      </div>
    </div>
  );
}
