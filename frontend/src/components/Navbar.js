import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { logout, userEmail } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-brand">Finance Tracker</div>
      <div className="nav-user">
        <span style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{userEmail || "User"}</span>
        <button onClick={logout} className="btn" style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}
