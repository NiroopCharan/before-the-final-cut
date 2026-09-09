import { useRef, useState } from "react";

const EVENT = {
  title: "BEFORE THE FINAL CUT",
  subTitle: "FAREWELL 2026",
  date: "26 SEPTEMBER 2026",
  time: "6:00 PM — 10:00 PM",
  venue: "AMPHI THEATER",
  host: "The Juniors",
};

export function InvitationSection({ onOpenTicket }) {
  return (
    <section className="invitation-section" id="invitation">
      <div className="invitation-card">
        <div className="invitation-corner corner-tl" />
        <div className="invitation-corner corner-tr" />
        <div className="invitation-corner corner-bl" />
        <div className="invitation-corner corner-br" />

        <div className="invitation-seal" aria-hidden="true">
          <span>FC</span>
          <small>2026</small>
        </div>

        <p className="invitation-topline">ADMIT ONE · FINAL SCREENING · 2026</p>
        <p className="kicker">THE FINAL SCREENING PRESENTS</p>

        <h2>
          BEFORE THE <span>FINAL CUT</span>
        </h2>

        <p className="invitation-lead">
          To the graduating batch of 2026 — you are invited to one last evening
          before the credits roll.
        </p>

        <div className="invitation-grid">
          <div>
            <span>DATE</span>
            <b>{EVENT.date}</b>
          </div>
          <div>
            <span>SHOWTIME</span>
            <b>{EVENT.time}</b>
          </div>
          <div>
            <span>VENUE</span>
            <b>{EVENT.venue}</b>
          </div>
          <div>
            <span>PRESENTED BY</span>
            <b>{EVENT.host}</b>
          </div>
        </div>

        <div className="invitation-message">
          <p>One Last Night.</p>
          <p>One Final Scene.</p>
          <p>A Lifetime of Memories.</p>
        </div>

        <button
          type="button"
          className="primary-cta invitation-cta"
          onClick={onOpenTicket}
        >
          CLAIM YOUR PERSONAL TICKET <span>→</span>
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   ROYAL GOLD & NOIR TICKET GENERATOR
   ========================================================= */

export function TicketGenerator({ open, onClose }) {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fileRef = useRef(null);

  if (!open) return null;

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a JPG, PNG or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    setPhotoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPhotoUrl(previewUrl);
  };

  const generate = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!usn.trim()) {
      alert("Please enter your USN.");
      return;
    }

    if (!photoFile) {
      alert("Please upload your photo.");
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("usn", usn.trim().toUpperCase());
      formData.append("photo", photoFile);

      const response = await fetch("http://localhost:5000/api/seniors", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to create your ticket.");
      }

      setReady(true);
    } catch (error) {
      console.error("Ticket error:", error);
      alert(error?.message || "Unable to generate ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ticket-modal">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {!ready ? (
          <div>
            <p className="kicker">CLAIM YOUR PERSONAL TICKET</p>
            <h3>Your final scene deserves a ticket.</h3>
            <p className="form-intro">
              Enter your name, university seat number (USN), and upload your photo.
            </p>

            <label className="field-label">
              YOUR NAME
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Adam and Eve"
                autoComplete="off"
              />
            </label>

            <label className="field-label" style={{ marginTop: "1.2rem" }}>
              UNIVERSITY SEAT NUMBER (USN)
              <input
                type="text"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
                placeholder="e.g. 1DT00IS000"
                autoComplete="off"
              />
            </label>

            <div className="upload-grid">
              <button
                type="button"
                className="upload-box"
                onClick={() => fileRef.current?.click()}
              >
                <span>＋</span>
                <b>{photoUrl ? "CHANGE PHOTO" : "UPLOAD YOUR PHOTO"}</b>
                <small>JPG / PNG / WEBP</small>
              </button>

              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                hidden
                onChange={handlePhoto}
              />

              <div className="photo-preview">
                {photoUrl ? (
                  <img src={photoUrl} alt="Ticket preview" />
                ) : (
                  <span>PREVIEW</span>
                )}
              </div>
            </div>

            <button
              type="button"
              className="primary-cta full"
              onClick={generate}
              disabled={!name.trim() || !usn.trim() || !photoFile || submitting}
            >
              {submitting ? "CREATING YOUR TICKET..." : "GENERATE MY TICKET"}
              {!submitting && <span>→</span>}
            </button>
          </div>
        ) : (
          <div>
            <p className="kicker">PREMIERE PASS READY</p>

            {/* VINTAGE ROYAL NOIR TICKET */}
            <div className="royal-ticket">
              {/* Corner Notches */}
              <div className="notch notch-tl" />
              <div className="notch notch-tr" />
              <div className="notch notch-bl" />
              <div className="notch notch-br" />

              {/* Red ambient glow background */}
              <div className="ticket-crimson-flare" />

              {/* LEFT STUB (Photo & Name only) */}
              <div className="rt-left">
                <div className="rt-badge-top">ADMIT ONE</div>

                <div className="rt-avatar-wrap">
                  <div className="rt-avatar-border">
                    <img src={photoUrl} alt={name} />
                  </div>
                </div>

                <div className="rt-guest-name">{name}</div>
              </div>

              {/* PERFORATION DIVIDER WITH NOTCHES */}
              <div className="rt-divider">
                <div className="notch-perf notch-perf-top" />
                <span className="perf-dashes" />
                <div className="notch-perf notch-perf-bottom" />
              </div>

              {/* RIGHT MAIN (Event title, details, USN) */}
              <div className="rt-right">
                <div className="rt-top-row">
                  <span className="rt-header-kicker">CINEMATIC PREMIERE</span>
                  <div className="rt-wax-seal">
                    <span>FC</span>
                    <small>'26</small>
                  </div>
                </div>

                <h2 className="rt-title">BEFORE THE FINAL CUT</h2>

                <div className="rt-crimson-tag">{EVENT.subTitle}</div>

                <div className="rt-meta-grid">
                  <div className="rt-meta-cell">
                    <span>DATE</span>
                    <b>{EVENT.date}</b>
                  </div>
                  <div className="rt-meta-cell">
                    <span>TIME</span>
                    <b>6:00 PM</b>
                  </div>
                  <div className="rt-meta-cell full-width">
                    <span>VENUE</span>
                    <b>{EVENT.venue}</b>
                  </div>
                </div>

                <div className="rt-usn-bar">
                  <span className="rt-usn-label">TICKET ID</span>
                  <span className="rt-usn-value">{usn.toUpperCase()}</span>
                </div>

                <div className="rt-signoff">
                  <span>✦ ✦ ✦ SEE YOU AT THE FINAL SCREENING ✦ ✦ ✦</span>
                </div>
              </div>
            </div>

            <div className="ticket-actions">
              <button
                type="button"
                className="secondary-cta"
                onClick={handlePrint}
              >
                PRINT / SAVE PDF
              </button>

              <button
                type="button"
                className="primary-cta"
                onClick={onClose}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}