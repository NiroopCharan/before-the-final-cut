import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { InvitationSection, TicketGenerator } from "./Invitation";
import { BeforeClockSection, Credits } from "./CastAndMemory";

const EVENT_DATE = "26 September 2026";
const EVENT_TIME = "5:00 PM — 8:00 PM";

function FilmStrip() {
  const frames = Array.from({ length: 14 });

  return (
    <div className="film-strip" aria-hidden="true">
      <div className="film-track">
        {frames.map((_, index) => (
          <div className="film-frame" key={index}>
            <span />
          </div>
        ))}
      </div>
    </div>
  );
}

function ClockFace() {
  const marks = useMemo(() => Array.from({ length: 60 }), []);

  return (
    <div className="clock-shell" aria-hidden="true">
      <div className="clock-glow" />
      <div className="clock-face">
        {marks.map((_, index) => (
          <span
            className={index % 5 === 0 ? "clock-mark major" : "clock-mark"}
            key={index}
            style={{ transform: `rotate(${index * 6}deg)` }}
          />
        ))}

        <span className="clock-number n12">12</span>
        <span className="clock-number n3">3</span>
        <span className="clock-number n6">6</span>
        <span className="clock-number n9">9</span>

        <span className="clock-hand hour" />
        <span className="clock-hand minute" />
        <span className="clock-pin" />
      </div>
    </div>
  );
}

function StoryTimeline() {
  const chapters = [
    {
      year: "2022",
      label: "THE BEGINNING",
      title: "The First Frame",
      text: "New faces. New classrooms. New stories waiting to begin.",
      note: "FIRST APPEARANCE",
    },
    {
      year: "2023",
      label: "THE CHAOS",
      title: "Finding Our Rhythm",
      text: "Assignments, friendships, inside jokes and the kind of chaos that became normal.",
      note: "TAKE TWO",
    },
    {
      year: "2024",
      label: "THE JOURNEY",
      title: "Somewhere In Between",
      text: "Festivals, projects, trips, late nights and moments that slowly became memories.",
      note: "MID-SCENE",
    },
    {
      year: "2025",
      label: "THE MEMORIES",
      title: "The Frames We Keep",
      text: "By now, ordinary days had become the moments we knew we would miss.",
      note: "PENULTIMATE ACT",
    },
    {
      year: "2026",
      label: "THE FINAL CHAPTER",
      title: "Before the Final Cut",
      text: "One last year. One last evening. One final scene before the credits begin.",
      note: "FINAL APPEARANCE",
    },
  ];

  return (
    <section id="story" className="timeline-section">
      <div className="timeline-heading">
        <p className="kicker">CHAPTER I</p>
        <h3>EVERY STORY HAS A BEGINNING.</h3>
        <p className="timeline-intro">
          Four years. Eight chapters. A film made from ordinary days we never
          realised would matter this much.
        </p>
      </div>

      <div className="timeline-line" aria-hidden="true">
        <span />
      </div>

      <div className="timeline-list">
        {chapters.map((chapter, index) => (
          <motion.article
            className={`timeline-card ${index % 2 === 0 ? "left" : "right"}`}
            key={chapter.year}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            <div className="timeline-year-wrap">
              <span className="timeline-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="timeline-year">{chapter.year}</span>
            </div>

            <div className="timeline-frame">
              <div className="timeline-perf perf-top" />
              <div className="timeline-frame-inner">
                <span className="timeline-note">{chapter.note}</span>
                <h4>{chapter.label}</h4>
                <h5>{chapter.title}</h5>
                <p>{chapter.text}</p>
              </div>
              <div className="timeline-perf perf-bottom" />
            </div>

            <span className="timeline-dot" aria-hidden="true" />
          </motion.article>
        ))}
      </div>

      <motion.div
        className="timeline-ending"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
      >
        <p>2022 — 2026</p>
        <h4>FOUR YEARS. ONE FILM.</h4>
        <span>AND THE FINAL SCENE IS STILL TO COME.</span>
      </motion.div>
    </section>
  );
}

function EventCalendar() {
  const EVENT_START = useMemo(() => new Date(2026, 8, 26, 18, 0, 0), []);
  const EVENT_END = useMemo(() => new Date(2026, 8, 26, 22, 0, 0), []);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = setInterval(update, 1000); // updates every second
    return () => clearInterval(timer);
  }, []);

  const diffMs = EVENT_START - now;
  const isOver = now >= EVENT_END;
  const isLive = now >= EVENT_START && now < EVENT_END;
  const isEventDay =
    now.getFullYear() === 2026 && now.getMonth() === 8 && now.getDate() === 26;

  let status = "";
  if (isOver) {
    status = "THE FINAL CUT IS COMPLETE";
  } else if (isLive) {
    status = "THE FINAL SCREENING IS LIVE";
  } else if (isEventDay && diffMs <= 0) {
    status = "TODAY · THE FINAL SCREENING";
  } else if (diffMs > 0) {
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    const pad = (n) => String(n).padStart(2, "0");

    status = `${days}D : ${pad(hours)}H : ${pad(minutes)}M : ${pad(seconds)}S TO GO`;
  }

  const day = String(now.getDate()).padStart(2, "0");
  const month = now.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = String(now.getFullYear());

  const cards = [
    { label: "DAY", value: day },
    { label: "MONTH", value: month },
    { label: "YEAR", value: year },
  ];

  return (
    <div className="event-calendar" aria-label="Farewell countdown calendar">
      <div className="calendar-label">THE CLOCK IS TICKING</div>
      <div className="calendar-cards">
        {cards.map((card) => (
          <div className="calendar-card" key={card.label}>
            <div className="calendar-rings" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
            <div className="calendar-paper">
              <small>{card.label}</small>
              <strong>{card.value}</strong>
            </div>
          </div>
        ))}
      </div>
      <div className="calendar-event-line">
        <span>FINAL SCREENING</span>
        <b>26 SEP 2026</b>
        <em>{status}</em>
      </div>
    </div>
  );
}

function IntroOverlay({ onEnter }) {
  return (
    <motion.div
      className="intro-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grain" />
      <motion.div
        className="intro-content"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <EventCalendar />
        <div className="intro-dot" />
        <h1>
          BEFORE THE
          <span>FINAL CUT</span>
        </h1>
        <p className="intro-sub">FAREWELL 2026</p>
        <p className="intro-date">26.09.2026</p>

        <button className="cinema-button" onClick={onEnter}>
          OPEN YOUR INVITATION
          <span>→</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [entered, setEntered] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);

  return (
    <div className="site-shell">
      <div className="grain" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {!entered && <IntroOverlay onEnter={() => setEntered(true)} />}

      <section className="hero">
        <FilmStrip />

        <div className="hero-inner">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 30 }}
            animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1.1, delay: 0.15 }}
          >
            <p className="kicker">THE FINAL SCREENING</p>

            <h2 className="hero-title">
              BEFORE THE
              <span>FINAL CUT</span>
            </h2>

            <p className="tagline">
              One Last Night. One Final Scene.
              <br />
              A Lifetime of Memories.
            </p>

            <div className="event-meta">
              <span>{EVENT_DATE}</span>
              <i />
              <span>{EVENT_TIME}</span>
            </div>

            <a href="#invitation" className="gold-link">
              OPEN THE INVITATION
              <span>↓</span>
            </a>
          </motion.div>

          <motion.div
            className="hero-art"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={entered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.4, delay: 0.25 }}
          >
            <ClockFace />
            <div className="reel reel-one">
              <span /><span /><span /><span /><span />
            </div>
            <div className="reel reel-two">
              <span /><span /><span /><span /><span />
            </div>
          </motion.div>
        </div>

        <div className="hero-bottom-rule">
          <span>26 • 09 • 2026</span>
          <b />
          <span>FAREWELL 2026</span>
        </div>
      </section>

      <InvitationSection onOpenTicket={() => setTicketOpen(true)} />
      <StoryTimeline />
      <BeforeClockSection />
      <Credits />

      {/* Render only when active so it does not ghost-render or reset unexpectedly */}
      {ticketOpen && (
        <TicketGenerator open={ticketOpen} onClose={() => setTicketOpen(false)} />
      )}
    </div>
  );
}

export default App;