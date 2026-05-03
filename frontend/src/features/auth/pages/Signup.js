import { useState } from "react";
import { authService } from "../authService";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setError("");
      setLoading(true);
      await authService.signup(email, password);
      alert("Account created successfully! You can now log in.");
      navigate("/");
    } catch (err) {
      setError("Signup failed. Email might already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="card auth-card">
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>Create Account</h2>
          <p style={{ color: '#9CA3AF', fontWeight: '500' }}>Start tracking your finances today</p>
        </div>
        
        {error && <p className="text-danger mb-4 text-center" style={{ backgroundColor: 'var(--danger-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontWeight: '500' }}>{error}</p>}
        
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input type="email" placeholder="you@example.com" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" placeholder="Create a strong password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          
          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }} disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        
        <p className="text-center text-muted" style={{ fontSize: '0.9rem' }}>
          Already have an account? <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
