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
        navigate("/login");
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
        const response = await axios.get(`http://localhost:3000/api/profiles/${session.user.id}/recommendations`);
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
  }, [navigate]);

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
      <main className="cp-page-main py-12 px-6 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Profil Kamu</h1>
          <p className="text-slate-500 mb-6">Informasi akun dan riwayat asesmen karirmu.</p>
          
          <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Informasi Akun</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500">Nama Lengkap</p>
                <p className="font-medium text-slate-800">{profile?.full_name || session?.user?.user_metadata?.full_name || "Pengguna"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-800">{session?.user?.email}</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-6">Riwayat Rekomendasi</h2>
          
          {history.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <p className="text-slate-500 mb-4">Kamu belum pernah melakukan tes asesmen.</p>
              <button 
                onClick={() => navigate("/tes")}
                className="cp-btn"
              >
                Mulai Tes Sekarang
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {history.map((rec) => (
                <div key={rec.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                    <span className="text-sm font-medium text-slate-500">
                      ID: {rec.id.substring(0, 8)}...
                    </span>
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {new Date(rec.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  <div className="grid gap-3">
                    {rec.professions.sort((a, b) => a.rank - b.rank).map((prof, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-[#f8f9fc] p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-[#c8ff6b] text-slate-800' : 'bg-slate-200 text-slate-600'}`}>
                            #{prof.rank}
                          </div>
                          <span className="font-semibold text-slate-800">{prof.career_name}</span>
                        </div>
                        <span className="font-pixel text-lg font-bold text-blue-600">
                          {Math.round(prof.readiness_percentage)}% Match
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="cp-footer">
        <div className="cp-footer-name">careerpath.ai</div>
        <div className="cp-footer-tagline">find your path in tech</div>
      </footer>
    </div>
  );
}
