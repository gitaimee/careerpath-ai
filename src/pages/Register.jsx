import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Sign up user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (signUpError) throw signUpError;

      // 2. We use a Supabase trigger to auto-create the profile. 
      // Assuming the trigger handles creating row in "profiles".
      
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
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
          <h1 className="auth-title">Buat Akun</h1>
          
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="auth-form">
            <div>
              <label className="auth-label">Nama Lengkap</label>
              <input 
                type="text" 
                required
                className="auth-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            
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
                minLength={6}
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="cp-btn"
              style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <p className="auth-footer">
            Sudah punya akun? <Link to="/login" className="auth-link">Masuk di sini</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
