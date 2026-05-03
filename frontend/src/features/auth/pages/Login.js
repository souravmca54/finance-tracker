import { useState, useContext } from "react";
import { authService } from "../authService";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setError("");
      setLoading(true);
      const data = await authService.login(email, password);
      login(data.access_token);
    } catch (err) {
      setError("Invalid login credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="card auth-card">
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>Welcome Back</h2>
          <p style={{ color: '#9CA3AF', fontWeight: '500' }}>Please enter your details to sign in</p>
        </div>
        
        {error && <p className="text-danger mb-4 text-center" style={{ backgroundColor: 'var(--danger-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontWeight: '500' }}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input type="email" placeholder="you@example.com" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" placeholder="••••••••" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          
          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        <p className="text-center text-muted" style={{ fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Sign up for free</Link>
        </p>
      </div>
    </div>
  );
}
