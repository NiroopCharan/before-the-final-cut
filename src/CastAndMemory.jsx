import { useState } from "react";

const API_BASE = (
  import.meta.env.VITE_API_URL || "https://before-the-final-cut.onrender.com"
).replace(/\/+$/, "");

export function BeforeClockSection() {
  const [experience, setExperience] = useState("");
  const [shared, setShared] = useState(false);

  const submit = async (e) => {
  e.preventDefault();

  if (!experience.trim()) return;

  try {
    const response = await fetch(`${API_BASE}/api/experiences`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        experience: experience.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save experience");
    }

    setShared(true);
    setExperience("");

    setTimeout(() => {
      setShared(false);
    }, 2600);

  } catch (error) {
    console.error("Experience submission error:", error);

    alert("Unable to share your experience. Please try again.");
  }
};

  return (
    <section
      className="before-clock-section experience-section"
      id="before-clock"
    >
      <div className="experience-inner">

        <div className="experience-heading">
          <p className="kicker">CHAPTER II</p>

          <h3>
            SHARE YOUR
            <br />
            <span>EXPERIENCE.</span>
          </h3>

          <p className="experience-intro">
            Before the final scene, tell us what these years meant to you.
          </p>
        </div>

        <form className="experience-form" onSubmit={submit}>

          <div className="experience-card">

            <div className="experience-card-header">
              <span>YOUR EXPERIENCE</span>
              <span>2022 — 2026</span>
            </div>

            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="A favourite memory, a lesson, a friendship, a funny moment — anything you want to leave behind..."
              maxLength={800}
            />

            <div className="experience-card-footer">
              <small>
                {experience.length} / 800
              </small>

              <span>
                ONE LAST NOTE
              </span>
            </div>

          </div>

          <button
            className="primary-cta experience-submit"
            type="submit"
            disabled={!experience.trim()}
          >
            SHARE YOUR EXPERIENCE
            <span>→</span>
          </button>

          {shared && (
            <p className="experience-message">
              THANK YOU. YOUR STORY IS PART OF THE FINAL SCENE.
            </p>
          )}

        </form>

      </div>
    </section>
  );
}

export function Credits() {
  return <section className="credits-section" id="credits"><p className="kicker">THE CREDITS</p><h3>THE NIGHT ENDS.<br/><span>THE MEMORIES DON’T.</span></h3><div className="credits-grid"><div><span>STARRING</span><b>THE GRADUATING BATCH</b></div><div><span>DIRECTED BY</span><b>THE JUNIORS</b></div><div><span>DATE</span><b>26 SEPTEMBER 2026</b></div><div><span>SHOWTIME</span><b>5:00 PM — 8:00 PM</b></div></div><p className="credits-finale">SEE YOU AT THE FINAL SCREENING.</p><p className="credits-date">26 • 09 • 2026</p></section>
}
