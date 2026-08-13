"use client";

import { useEffect, useMemo, useState } from "react";
import { copy, invitation, type Language } from "./invitation-content";

const carouselPhotos = [1, 2, 3, 4, 5, 6];

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => {
    const remaining = Math.max(0, new Date(target).getTime() - now);
    const pad = (value: number) => String(value).padStart(2, "0");
    return {
      days: String(Math.floor(remaining / 86_400_000)),
      hours: pad(Math.floor(remaining / 3_600_000) % 24),
      minutes: pad(Math.floor(remaining / 60_000) % 60),
      seconds: pad(Math.floor(remaining / 1_000) % 60),
    };
  }, [now, target]);
}

export function Invitation() {
  const [lang, setLang] = useState<Language>("ru");
  const [coverOpen, setCoverOpen] = useState(false);
  const [guest, setGuest] = useState("");
  const countdown = useCountdown(invitation.event.date);
  const t = copy[lang];

  useEffect(() => {
    const restore = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const urlLanguage = params.get("lang");
      const urlGuest = params.get("name");
      if (urlLanguage === "ru" || urlLanguage === "en") setLang(urlLanguage);
      if (urlGuest) setGuest(urlGuest);
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  const greeting = guest.trim() ? `${t.personalizedGreeting}, ${guest.trim()}!` : t.greeting;
  const names = `${invitation.couple.first} & ${invitation.couple.second}`;

  return (
    <main className="invitation-shell">
      <div className="floating-controls" aria-label="Language">
        {(["ru", "en"] as const).map((language) => (
          <button key={language} className={lang === language ? "active" : ""} onClick={() => setLang(language)} aria-pressed={lang === language}>
            {language.toUpperCase()}
          </button>
        ))}
      </div>

      {!coverOpen && (
        <section className="cover" aria-label={t.invitation}>
          <img className="garland" src="/inv/garland-lights.png" alt="" width="850" height="360" />
          <p className="script-name">{names}</p>
          <div className="polaroid">
            <img src="/inv/photo-intro.jpeg" alt={`${invitation.couple.first} and ${invitation.couple.second}`} width="720" height="960" fetchPriority="high" />
          </div>
          <button className="heart-button" onClick={() => setCoverOpen(true)} aria-label={t.open}>♥</button>
          <span className="cover-label">{t.open}</span>
          <button className="text-button" onClick={() => setCoverOpen(true)}>{t.skip}</button>
        </section>
      )}

      <section className="hero">
        <img className="rose rose-left" src="/inv/rose-spray.png" alt="" width="474" height="474" />
        <img className="rose rose-right" src="/inv/rose-bouquet-tall.png" alt="" width="350" height="525" />
        <p className="eyebrow">{t.invitation}</p>
        <div className="photo-marquee" aria-hidden="true">
          <div className="photo-track">
            {[...carouselPhotos, ...carouselPhotos].map((image, index) => (
              <img key={index} src={`/assets/photos/carousel-${image}.jpg`} alt="" width="1400" height="933" fetchPriority="low" />
            ))}
          </div>
        </div>
        <h1>{invitation.couple.first} <em>&</em> {invitation.couple.second}</h1>
        <div className="heart-divider"><span />♥<span /></div>
        <p className="date-display">{invitation.event.displayDate}</p>
        <p className="weekday">{invitation.event.weekday[lang]}</p>
      </section>

      <section className="intro section">
        <h2>{greeting}</h2>
        <p>{t.lead}</p>
        <p>{t.body}</p>
        <small>{t.sub}</small>
        <img src="/inv/rose-watercolor.png" alt="" width="1000" height="669" loading="lazy" />
      </section>

      <section className="section countdown-section">
        <h2>{t.countdown}</h2>
        <div className="countdown">
          {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
            <div key={unit}><strong>{countdown[unit]}</strong><span>{t[unit]}</span></div>
          ))}
        </div>
        <div className="schedule">
          <strong>{invitation.event.gatheringTime}</strong><span>{t.gathering}</span>
          <strong>{invitation.event.banquetTime}</strong><span>{t.banquet}</span>
        </div>
      </section>

      <section className="section">
        <div className="card details-card">
          <img className="single-rose" src="/inv/rose-single.png" alt="" width="700" height="700" loading="lazy" />
          <h2>{t.details}</h2>
          <dl>
            <div><dt>{t.date}</dt><dd>{invitation.event.displayDate}</dd></div>
            <div><dt>{t.time}</dt><dd>{invitation.event.gatheringTime}</dd></div>
            <div><dt>{t.place}</dt><dd>{invitation.venue.name}<small>{invitation.venue.city[lang]} · {invitation.venue.address}</small></dd></div>
          </dl>
          <div className="venue-gallery">
            <img src="/assets/location/royal-1.jpg" alt={`${invitation.venue.name} venue`} width="328" height="170" loading="lazy" />
            <img src="/assets/location/royal-2.jpg" alt={`${invitation.venue.name} interior`} width="328" height="170" loading="lazy" />
            <img src="/assets/location/royal-3.jpg" alt={`${invitation.venue.name} hall`} width="328" height="170" loading="lazy" />
          </div>
          <a className="primary-link" href={invitation.venue.mapUrl} target="_blank" rel="noreferrer">⌖ {t.openMap}</a>
        </div>
      </section>

      <section className="section text-section">
        <p className="eyebrow">Dress code</p>
        <h2>{t.dressTitle}</h2>
        <p>{t.dressBody}</p>
        <p className="note">{t.dressNote}</p>
        <div className="palette" aria-label="Suggested color palette">
          {["#c3b59f", "#899478", "#d9c6c1", "#a68474", "#6b7a68"].map((color) => <span key={color} style={{ backgroundColor: color }} />)}
        </div>
      </section>

      <section className="section">
        <div className="card photo-card">
          <span className="camera" aria-hidden="true">□</span>
          <h2>{t.photosTitle}</h2>
          <p>{t.photosBody}</p>
          <a className="primary-link" href={invitation.links.telegram} target="_blank" rel="noreferrer">{t.photosButton}</a>
        </div>
      </section>

      <footer>
        <img src="/inv/three-roses.png" alt="" width="1000" height="669" loading="lazy" />
        <p className="script-name">{names}</p>
        <strong>{invitation.event.displayDate} · {invitation.event.gatheringTime}</strong>
        <em>{t.footer}</em>
      </footer>
    </main>
  );
}
