export default function Insights({ data }) {
  if (!data) return null;

  return (
    <div className="card mb-4" style={{ padding: '2rem 1.5rem', background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)', border: '1px solid var(--border)' }}>
      <div className="flex items-center mb-4" style={{ gap: '0.75rem' }}>
        <span style={{ fontSize: '1.75rem' }}>🤖</span>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>AI Financial Insights</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <p style={{ margin: 0, fontWeight: '500', color: 'var(--text-dark)' }}>{data.summary}</p>
        </div>
        
        <div style={{ padding: '1rem', backgroundColor: '#ECFDF5', borderRadius: 'var(--radius-md)', border: '1px solid #A7F3D0' }}>
          <div className="flex items-start gap-3">
            <span style={{ fontSize: '1.2rem' }}>💡</span>
            <p style={{ margin: 0, color: 'var(--success-dark)', fontWeight: '500' }}>{data.tips}</p>
          </div>
        </div>
        
        {data.warning && (
          <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-md)', border: '1px solid #FECACA' }}>
            <div className="flex items-start gap-3">
              <span style={{ fontSize: '1.2rem' }}>⚠️</span>
              <p style={{ margin: 0, color: 'var(--danger-dark)', fontWeight: '500' }}>{data.warning}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
