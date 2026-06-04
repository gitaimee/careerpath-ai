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
      <main className="cp-page-main flex flex-col items-center justify-center py-20">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-slate-100">
          <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">Buat Akun</h1>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c8ff6b] focus:border-[#c8ff6b] outline-none transition"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c8ff6b] focus:border-[#c8ff6b] outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
              <input 
                type="password" 
                required
                minLength={6}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#c8ff6b] focus:border-[#c8ff6b] outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="cp-btn mt-4 flex justify-center w-full"
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-slate-500">
            Sudah punya akun? <Link to="/login" className="text-blue-600 font-medium hover:underline">Masuk di sini</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
