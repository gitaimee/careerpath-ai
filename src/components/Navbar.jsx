import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import logoImg from "../assets/logo.png";

const navClass = ({ isActive }) => (isActive ? "active" : undefined);

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smart sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide if scrolling down and past the navbar height (71px). Show if scrolling up.
      if (currentScrollY > lastScrollY && currentScrollY > 71 && !isMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
    <nav className={`cp-navbar ${isVisible ? '' : 'nav-hidden'}`.trim()}>
      <Link to="/" className="cp-logo">
        <img src={logoImg} alt="" className="cp-logo-img" />
        <span className="cp-logo-text">careerpath.ai</span>
      </Link>
      
      <button 
        className="cp-hamburger" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <span style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
        <span style={{ opacity: isMenuOpen ? 0 : 1 }}></span>
        <span style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
      </button>

      <div className={`cp-nav-links ${isMenuOpen ? 'open' : ''}`}>
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
            <button onClick={handleLogout} className="nav-logout-btn">
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
