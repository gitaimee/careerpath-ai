import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import logoImg from "../assets/logo.png";

const navClass = ({ isActive }) => (isActive ? "active" : undefined);

export default function Navbar() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="cp-navbar">
      <Link to="/" className="cp-logo">
        <img src={logoImg} alt="" className="cp-logo-img" />
        <span className="cp-logo-text">careerpath.ai</span>
      </Link>
      <div className="cp-nav-links">
        <NavLink to="/eksplor" className={navClass}>
          eksplor
        </NavLink>
        <NavLink to="/tes" className={navClass}>
          tes
        </NavLink>
        
        {session ? (
          <>
            <NavLink to="/profil" className={navClass}>
              profil
            </NavLink>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium">
              logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className={navClass}>
            masuk
          </NavLink>
        )}
      </div>
    </nav>
  );
}
