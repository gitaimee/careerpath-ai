import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Sync guest history
      try {
        const guestHistory = JSON.parse(localStorage.getItem('careerpath_guest_history'));
        if (guestHistory && guestHistory.length > 0) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.id) {
            await axios.post('http://localhost:3000/api/assessments/sync', {
              user_id: session.user.id,
              history: guestHistory
            });
            localStorage.removeItem('careerpath_guest_history');
          }
        }
      } catch (syncErr) {
        console.error("Error syncing history:", syncErr);
      }

      // Navigate to profile or explore
      navigate("/profil");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cp-root">
      <Navbar />
      <main className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Masuk</h1>
          
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="auth-form">
            <div>
              <label className="auth-label">Email</label>
              <input 
                type="email" 
                required
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="auth-label">Password</label>
              <input 
                type="password" 
                required
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="cp-btn"
              style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p className="auth-footer">
            Belum punya akun? <Link to="/register" className="auth-link">Daftar di sini</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
