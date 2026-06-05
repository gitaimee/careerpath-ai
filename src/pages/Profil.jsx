import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase";

export default function Profil() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Guest User - get from local storage
        const guestHistory = JSON.parse(localStorage.getItem('careerpath_guest_history')) || [];
        const mappedHistory = guestHistory.map((item, idx) => ({
            id: `guest-rec-${idx}`,
            created_at: item.date,
            professions: item.professions
        })).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        setHistory(mappedHistory);
        setLoading(false);
        return;
      }
      
      setSession(session);

      try {
        // Get user profile from Supabase
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Get recommendations history from backend API
        const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
        const response = await axios.get(`${API_URL}/api/profiles/${session.user.id}/recommendations`);
        if (response.data.status === "success") {
          // Group by rec_id since the API returns flat rows joining recommendations with recommended_professions
          const grouped = response.data.data.reduce((acc, row) => {
            if (!acc[row.rec_id]) {
              acc[row.rec_id] = {
                id: row.rec_id,
                created_at: row.created_at,
                professions: []
              };
            }
            acc[row.rec_id].professions.push({
              career_name: row.career_name,
              readiness_percentage: row.readiness_percentage,
              rank: row.rank
            });
            return acc;
          }, {});
          
          setHistory(Object.values(grouped).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="cp-root">
        <Navbar />
        <main className="cp-page-main flex items-center justify-center">
          <p className="text-xl text-slate-500">Memuat profil...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="cp-root">
      <Navbar />
      <main className="profile-container">
        <div className="profile-card">
          <h1 className="auth-title" style={{textAlign: 'left', marginBottom: '0.5rem'}}>Profil Kamu</h1>
          <p style={{color: '#64748b', marginBottom: '1.5rem'}}>Informasi akun dan riwayat asesmen karirmu.</p>
          
          <div className="profile-info-grid">
            <div>
              <p style={{fontSize: '0.875rem', color: '#64748b'}}>Nama Lengkap</p>
              <p style={{fontWeight: '500', color: '#1e293b'}}>{session ? (profile?.full_name || session?.user?.user_metadata?.full_name || "Pengguna") : "Pengguna Guest"}</p>
            </div>
            <div>
              <p style={{fontSize: '0.875rem', color: '#64748b'}}>Email</p>
              <p style={{fontWeight: '500', color: '#1e293b'}}>{session ? session?.user?.email : "Belum Login"}</p>
            </div>
          </div>
          
          {!session && (
            <div style={{marginTop: '1.5rem', padding: '0.75rem', backgroundColor: '#eff6ff', borderRadius: '0.5rem', border: '1px solid #bfdbfe'}}>
              <p style={{color: '#1e3a8a', fontSize: '0.875rem'}}>Kamu sedang menggunakan mode Guest. Riwayat ini hanya tersimpan di browser saat ini. <a href="/register" style={{fontWeight: 'bold', textDecoration: 'underline'}}>Daftar sekarang</a> agar riwayatmu tidak hilang!</p>
            </div>
          )}
        </div>

        <h2 className="auth-title" style={{textAlign: 'left'}}>Riwayat Rekomendasi</h2>
          
        {history.length === 0 ? (
          <div className="profile-card" style={{textAlign: 'center', borderStyle: 'dashed'}}>
            <p style={{color: '#64748b', marginBottom: '1rem'}}>Kamu belum pernah melakukan tes asesmen.</p>
            <button 
              onClick={() => navigate("/tes")}
              className="cp-btn"
            >
              Mulai Tes Sekarang
            </button>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {history.map((rec) => (
              <div key={rec.id} className="rec-history-item">
                <div className="rec-history-header">
                  <span style={{fontSize: '0.875rem', fontWeight: '500', color: '#64748b'}}>
                    ID: {rec.id.substring(0, 8)}...
                  </span>
                  <span className="rec-history-date">
                    {new Date(rec.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  {rec.professions.sort((a, b) => a.rank - b.rank).map((prof, idx) => (
                    <div key={idx} className="rec-prof-row">
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                        <div className={`rec-prof-rank ${idx === 0 ? 'rank-1' : 'rank-other'}`}>
                          #{prof.rank}
                        </div>
                        <span style={{fontWeight: '600', color: '#1e293b'}}>{prof.career_name}</span>
                      </div>
                      <span className="rec-prof-match">
                        {Math.round(prof.readiness_percentage)}% Match
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="cp-footer">
        <div className="cp-footer-name">careerpath.ai</div>
        <div className="cp-footer-tagline">find your path in tech</div>
      </footer>
    </div>
  );
}
