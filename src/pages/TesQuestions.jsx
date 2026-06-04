import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import { testQuestions } from "../data/testQuestions";
import { jobCards } from "../data/jobCards";

const SLIDE_MS = 280;

export default function TesQuestions() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [direction, setDirection] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [btnPressed, setBtnPressed] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = testQuestions.length;
  const q = testQuestions[current];
  const progress = ((current + 1) / total) * 100;
  const hasAnswer = selected[current] !== undefined;

  const goTo = (idx, dir) => {
    if (animating || idx < 0 || idx >= total) return;
    setDirection(dir);
    setAnimating(true);
    setBtnPressed(dir === "next" ? "next" : "prev");
    setTimeout(() => setBtnPressed(null), 200);
    setTimeout(() => {
      setCurrent(idx);
      setDirection(null);
      setAnimating(false);
    }, SLIDE_MS);
  };

  const handlePrev = () => { if (current > 0) goTo(current - 1, "prev"); };
  const handleNext = () => { if (!hasAnswer) return; if (current < total - 1) goTo(current + 1, "next"); };

  const handleSelect = (answerIdx) => {
    setSelected((prev) => ({ ...prev, [current]: answerIdx }));
  };

  // ── DUMMY: hapus blok ini dan ganti dengan API call beneran ──────────────
  const handleSubmit = async () => {
    if (!hasAnswer || isSubmitting) return;
    setIsSubmitting(true);
    
    // Map selected object to an array of 10 integers (1-5 scale)
    const answers = [];
    for (let i = 0; i < 10; i++) {
      // selected[i] is 0-4, we add 1 to make it 1-5
      answers.push((selected[i] || 0) + 1);
    }
    
    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await axios.post("http://localhost:3000/api/assessments", {
        user_id: session?.user?.id || "00000000-0000-0000-0000-000000000000", 
        answers: answers,
        time_commitment_hours: 20
      });
      
      const professions = response.data.data.professions;
      const topJob = professions[0];
      
      const slugMap = {
        0: "business-analyst",
        1: "cloud-engineer",
        2: "content-creator",
        3: "cybersecurity-analyst",
        4: "data-analyst",
        5: "digital-marketer",
        6: "machine-learning-engineer",
        7: "project-manager",
        8: "software-engineer",
        9: "ui-ux-designer"
      };
      
      const jobSlug = slugMap[topJob.career_encoded] || "software-engineer";
      
      navigate("/hasil", { state: { result: jobSlug, professionsData: professions } });
    } catch (err) {
      console.error("Error submitting assessment:", err);
      // Fallback if backend fails
      const randomJob = jobCards[Math.floor(Math.random() * jobCards.length)];
      navigate("/hasil", { state: { result: randomJob.slug } });
    } finally {
      setIsSubmitting(false);
    }
  };
  // ── END DUMMY ─────────────────────────────────────────────────────────────

  const animClass = animating
    ? direction === "next" ? "cp-tq-slide-out-left" : "cp-tq-slide-out-right"
    : "cp-tq-slide-in";

  const isLast = current === total - 1;

  return (
    <div className="cp-root">
      <Navbar />

      <main className="cp-tq-main">
        <div className="cp-tq-progress-wrapper">
          <div className="cp-tq-progress-track">
            <div className="cp-tq-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="cp-tq-progress-label">
            {current + 1} / {total}
          </span>
        </div>

        <section className="cp-tq-card-wrapper">
          <div className={`cp-tq-card ${animClass}`} key={current}>
            <div className="cp-tq-inner">
              <h2 className="cp-tq-heading">Pertanyaan #{q.id}</h2>
              <p className="cp-tq-question">{q.question}</p>

              <div className="cp-tq-answers">
                {q.answers.map((answer, idx) => (
                  <button
                    key={answer}
                    type="button"
                    className={`cp-tq-answer${selected[current] === idx ? " cp-tq-answer-selected" : ""}`}
                    onClick={() => handleSelect(idx)}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="cp-tq-nav">
          <button
            type="button"
            className={`cp-tq-nav-btn${current === 0 ? " cp-tq-nav-btn-disabled" : ""}${btnPressed === "prev" ? " cp-tq-nav-btn-pressed" : ""}`}
            onClick={handlePrev}
            disabled={current === 0}
            aria-label="Pertanyaan sebelumnya"
          >
            <span className="cp-tq-nav-arrow">←</span>
            sebelumnya
          </button>

          <div className="cp-tq-dots">
            {testQuestions.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={[
                  "cp-tq-dot",
                  idx === current && "cp-tq-dot-active",
                  selected[idx] !== undefined && "cp-tq-dot-answered",
                ].filter(Boolean).join(" ")}
                onClick={() => goTo(idx, idx > current ? "next" : "prev")}
                aria-label={`Pertanyaan ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className={`cp-tq-nav-btn${(!hasAnswer || isSubmitting) ? " cp-tq-nav-btn-disabled" : ""}${btnPressed === "next" ? " cp-tq-nav-btn-pressed" : ""}${isLast ? " cp-tq-nav-btn-submit" : ""}`}
            onClick={isLast ? handleSubmit : handleNext}
            disabled={!hasAnswer || isSubmitting}
            aria-label={isLast ? "Lihat hasil" : "Pertanyaan selanjutnya"}
          >
            {isLast ? (isSubmitting ? "sedang memproses..." : "lihat hasil") : "selanjutnya"}
            {!isLast && <span className="cp-tq-nav-arrow">→</span>}
          </button>
        </div>
      </main>

      <footer className="cp-footer">
        <div className="cp-footer-name">careerpath.ai</div>
        <div className="cp-footer-tagline">find your path in tech</div>
      </footer>
    </div>
  );
}