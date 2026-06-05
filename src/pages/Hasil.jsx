import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import { jobCards } from "../data/jobCards";

const CONFETTI_COLORS = ["#88a2ff", "#e3fc87", "#d1ffa4", "#ffb3d9", "#ffd6a5", "#c0e0ff"];
const CONFETTI_COUNT = 20;

function Confetti({ active }) {
  const particles = useMemo(
    () =>
      Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1.6 + Math.random() * 0.8,
        size: 7 + Math.random() * 8,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        drift: (Math.random() - 0.5) * 80,
        shape: Math.random() > 0.5 ? "circle" : "rect",
      })),
    [],
  );

  if (!active) return null;

  return (
    <div className="cp-hasil-confetti" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="cp-hasil-confetti-piece"
          style={{
            left: `${p.x}%`,
            width: p.shape === "circle" ? p.size : p.size * 0.7,
            height: p.shape === "circle" ? p.size : p.size * 1.4,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            background: p.color,
            "--fall-delay": `${p.delay}s`,
            "--fall-duration": `${p.duration}s`,
            "--fall-rotate": `${p.rotation}deg`,
            "--fall-drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function StarBurst({ active }) {
  if (!active) return null;
  return (
    <div className="cp-hasil-starburst" aria-hidden="true">
      {["✦", "✧", "⭐", "✦", "✧", "✦", "⭐", "✧"].map((s, i) => (
        <span key={i} className="cp-hasil-star">
          {s}
        </span>
      ))}
    </div>
  );
}

export default function Hasil({ result }) {
  const navigate = useNavigate();
  const job = jobCards.find((j) => j.slug === result) ?? jobCards[0];

  const [phase, setPhase] = useState("hidden");
  const [effectsOn, setEffectsOn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsGuest(!session);
    });

    const revealTimer = setTimeout(() => setPhase("reveal"), 150);
    const showTimer = setTimeout(() => {
      setPhase("show");
      setEffectsOn(true);
    }, 850);
    const effectsOffTimer = setTimeout(() => setEffectsOn(false), 3000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(showTimer);
      clearTimeout(effectsOffTimer);
    };
  }, []);

  const cardClass =
    phase === "hidden"
      ? "cp-hasil-card-hidden"
      : phase === "reveal"
        ? "cp-hasil-card-reveal"
        : "cp-hasil-card-show";

  return (
    <div className="cp-root">
      <Navbar />

      <Confetti active={effectsOn} />
      <StarBurst active={effectsOn} />

      <div className="cp-hasil-page">
        <div className="cp-hasil-hero-gradient" aria-hidden="true" />

        <main className="cp-hasil-main">
          <div className={`cp-hasil-card ${cardClass}`}>
            <div className="cp-hasil-info">
              <div className="cp-hasil-wow">
                <span className="cp-hasil-wow-emoji">🫨🎊</span>
              </div>

              <h1 className="cp-hasil-title">
                Wow... kamu adalah
                <br />
                <span className="cp-hasil-name">{job.name}!</span>
              </h1>

              {job.description && <p className="cp-hasil-desc">{job.description}</p>}

              <button
                type="button"
                className="cp-btn cp-hasil-btn"
                onClick={() => navigate(`/detail/${job.slug}`)}
              >
                lihat detail
              </button>
            </div>

            <div className="cp-hasil-img-wrap">
              <img src={job.img} alt={job.name} className="cp-hasil-img" />
            </div>
          </div>

          {isGuest && (
            <div className="cp-hasil-guest-cta">
              <div className="cp-hasil-guest-cta-icon">🔐</div>
              <div className="cp-hasil-guest-cta-text">
                <p className="cp-hasil-guest-cta-title">Simpan riwayat rekomendasimu!</p>
                <p className="cp-hasil-guest-cta-desc">
                  Kamu sedang menggunakan mode Guest. Masuk atau daftar sekarang agar riwayat rekomendasimu tersimpan permanen dan bisa diakses kapan saja dari halaman Profil.
                </p>
              </div>
              <div className="cp-hasil-guest-cta-actions">
                <Link to="/login" className="cp-btn cp-hasil-guest-cta-login">Masuk</Link>
                <Link to="/register" className="cp-hasil-guest-cta-register">Daftar Akun →</Link>
              </div>
            </div>
          )}

          <Link to="/tes" className="cp-hasil-retry">
            coba lagi →
          </Link>
        </main>

        <footer className="cp-footer">
          <div className="cp-footer-name">careerpath.ai</div>
          <div className="cp-footer-tagline">find your path in tech</div>
        </footer>
      </div>
    </div>
  );
}

