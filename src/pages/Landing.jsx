import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import imgCarrie from "../assets/landing/carrie.png";
import imgData from "../assets/data 1.png";
import imgUiux from "../assets/uiux 1.png";
import imgMl from "../assets/machine learning 1.png";
import imgContent from "../assets/machine learning 1-1.png";
import imgDigimarketing from "../assets/digimarketing 1.png";
import { jobCards } from "../data/jobCards";

export default function Landing() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    const onDown = (e) => {
      isDown = true;
      el.style.cursor = "grabbing";
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onUp = () => {
      isDown = false;
      el.style.cursor = "grab";
    };
    const onMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX) * 1.4;
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseleave", onUp);
    el.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseleave", onUp);
      el.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="cp-root">
      <Navbar />

      <section className="cp-hero">
        <div className="cp-hero-gradient" aria-hidden="true" />

        <div className="cp-float-icon cp-fi-uiux">
          <img src={imgUiux} alt="" />
        </div>
        <div className="cp-float-icon cp-fi-ml">
          <img src={imgMl} alt="" />
        </div>
        <div className="cp-float-icon cp-fi-content">
          <img src={imgContent} alt="" />
        </div>
        <div className="cp-float-icon cp-fi-data">
          <img src={imgData} alt="" />
        </div>

        <h1 className="cp-hero-title">
          Welcome to The <br />
          <span className="cp-highlight">Tech Parade!</span>
        </h1>
        <p className="cp-hero-sub">
          Selamat datang di parade digital CareerPath AI!
          <br />
          Temukan jalan untukmu di dunia digital ^^
        </p>
      </section>

      <section className="cp-section1">
        <div className="cp-carrie-img">
          <img src={imgCarrie} alt="Carrie the jellyfish" />
        </div>
        <div className="cp-card">
          <div className="cp-card-title">
            Kenalan dengan si <span className="cp-blue">Carrie</span>
          </div>
          <p className="cp-card-desc">
            Ini Carrie, ubur-ubur chill yang akan membantu kamu menemukan jati dirimu di dunia IT.
            <br />
            Apa kamu siap dengan prediksi Carrie?
          </p>
          <Link to="/tes" className="cp-btn">
            coba tes
          </Link>
        </div>
      </section>

      <section className="cp-section2">
        <div className="cp-section2-blob" aria-hidden="true" />

        <div className="cp-scroll-wrapper" ref={scrollRef}>
          <div className="cp-cards-row">
            {jobCards.map((job) => (
              <JobCard key={job.name} image={job.img} name={job.name} />
            ))}
          </div>
        </div>

        <p className="cp-section2-label">Karir digital yang manakah dirimu?</p>
      </section>

      <section className="cp-section3">
        <div className="cp-section3-blob" aria-hidden="true" />
        <div className="cp-card">
          <div className="cp-card-title cp-blue">Ada apa saja di sini?</div>
          <p className="cp-card-desc">
            Kamu pasti penasaran dengan dunia karir digital ini!
            <br />
            Mau tau lebih dalam? Ayo kita gali!
          </p>
          <Link to="/eksplor" className="cp-btn">
            eksplor
          </Link>
        </div>
        <div className="cp-section3-img">
          <img src={imgDigimarketing} alt="Digital Marketing" />
        </div>
      </section>

      <footer className="cp-footer">
        <div className="cp-footer-name">careerpath.ai</div>
        <div className="cp-footer-tagline">find your path in tech</div>
      </footer>
    </div>
  );
}
