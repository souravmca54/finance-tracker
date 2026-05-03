import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Charts({ data }) {
  if (!data || (data.total_income === 0 && data.total_expense === 0)) {
    return (
      <div className="card flex items-center justify-center text-center mb-4" style={{ minHeight: '200px', backgroundColor: '#F9FAFB' }}>
        <div>
          <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>📊</span>
          <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.5rem' }}>No data yet</h3>
          <p className="text-muted">Add transactions to see insights</p>
        </div>
      </div>
    );
  }

  // Calculate percentages for Pie Chart labels
  const totalExpenses = data.expenses_by_category.reduce((sum, e) => sum + e.amount, 0);
  const pieLabels = data.expenses_by_category.map(e => {
    const percentage = totalExpenses > 0 ? Math.round((e.amount / totalExpenses) * 100) : 0;
    return `${e.category} - ${percentage}%`;
  });

  // Pie Chart Data (Category Breakdown)
  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: data.expenses_by_category.map(e => e.amount),
        backgroundColor: [
          '#F59E0B', // Orange
          '#EF4444', // Red
          '#10B981', // Green
          '#3B82F6', // Blue
          '#8B5CF6', '#EC4899'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } }
    },
    animation: { animateScale: true }
  };

  // Bar Chart Data (Income vs Expense)
  const barData = {
    labels: ['Overview'],
    datasets: [
      {
        label: 'Income',
        data: [data.total_income],
        backgroundColor: '#10B981',
        borderRadius: 4,
        barPercentage: 0.6,
      },
      {
        label: 'Expense',
        data: [data.total_expense],
        backgroundColor: '#EF4444',
        borderRadius: 4,
        barPercentage: 0.6,
      }
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } }
    },
    animation: { duration: 1000 },
    scales: {
      y: { beginAtZero: true, grid: { color: '#E5E7EB', drawBorder: false } },
      x: { grid: { display: false, drawBorder: false } }
    }
  };

  return (
    <div className="charts-grid mb-4">
      <div className="card" style={{ padding: '2rem 1.5rem' }}>
        <div className="text-center mb-4">
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Category Breakdown</h3>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>Where your money goes</p>
        </div>
        {data.expenses_by_category.length === 0 ? (
          <div className="flex items-center justify-center text-center" style={{ height: '220px' }}>
            <p className="text-muted">No expenses to categorize.</p>
          </div>
        ) : (
          <div style={{ height: '220px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        )}
      </div>

      <div className="card" style={{ padding: '2rem 1.5rem' }}>
        <div className="text-center mb-4">
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Income vs Expense</h3>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>Your net flow</p>
        </div>
        <div style={{ height: '220px', width: '100%' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}
