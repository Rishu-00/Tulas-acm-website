import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const gallery = [
  ["/gallery/acm_inauguration.jpg", "ACM INAUGURATION", "COMMUNITY"],
  ["/gallery/care-e-thon.jpg", "CARE-E-THON", "HACKATHON"],
  ["/gallery/workshop-session.jpg", "WORKSHOP SESSION", "LEARN"],
  ["/gallery/design.jpg", "DESIGN-ATHON", "BUILD"],
  ["/gallery/img2.jpg", "TECH TALK", "CONNECT"],
  ["/gallery/img4.jpg", "CODING COMPETITION", "COMPETE"],
  ["/gallery/web-devlopment.jpg", "WEB DEVELOPMENT", "CREATE"],
  ["/gallery/team.jpg", "THE COMMUNITY", "TOGETHER"],
];
const people = [
  ["/team/chetan-pandey.jpg", "Chetan Pandey", "CHAIRPERSON"],
  ["/team/smriti-bisht.jpg", "Smriti Bisht", "VICE-CHAIRPERSON"],
  ["/team/prashant.jpg", "Prashant Krishna Bharti", "SECRETARY"],
  ["/team/prakriti.jpg", "Prakriti", "TREASURER"],
  ["/team/rishanshu.jpg", "Rishanshu", "WEB MASTER"],
  ["/team/piyush.jpg", "Piyush Lingwal", "TECH LEAD"],
  ["/team/nikhil.jpg", "Nikhil Rajput", "CO TECH LEAD"],
  ["/team/dhruvsharma.jpg", "Dhruv Sharma", "DESIGNER HEAD"],
];
const events = [
  ["01", "AI / ML WORKSHOP", "HANDS-ON · 2026", "/gallery/workshop.jpg"],
  ["02", "DESIGN-ATHON", "BUILD · SHIP · LEARN", "/gallery/design-athon.jpg"],
  ["03", "CARE-E-THON", "COMMUNITY · IMPACT", "/gallery/care-e-thon.jpg"],
  [
    "04",
    "ACM INAUGURATION",
    "MEET · CONNECT · CREATE",
    "/gallery/acm_inauguration.jpg",
  ],
];

function Rain({ dense = false }) {
  const cols = useMemo(
    () =>
      Array.from({ length: dense ? 30 : 22 }, (_, i) => ({
        left: `${(i / (dense ? 30 : 22)) * 100}%`,
        dur: 5 + (i % 7) * 0.8,
        delay: -(i * 0.55),
        text:
          i % 3 === 0
            ? "0101<ACM/>"
            : i % 3 === 1
            ? "1010//BUILD"
            : "01::CREATE",
      })),
    [dense]
  );
  return (
    <div className="rain">
      {cols.map((c, i) => (
        <div
          key={i}
          className="rain-col"
          style={{
            left: c.left,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          {c.text.split("").map((x, j) => (
            <span key={j}>{x}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
function Reveal({ children, delay = 0 }) {
  return (
    <div className="reveal" style={{ "--delay": `${delay}s` }}>
      {children}
    </div>
  );
}
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <a href="#top" className="brand">
        <img src="/icon.png" />
        <span>
          TULAS ACM<small>STUDENT CHAPTER</small>
        </span>
      </a>
      <div className={"links " + (open ? "open" : "")}>
        {["ABOUT", "EVENTS", "PROJECTS", "TEAM", "GALLERY"].map((x) => (
          <a
            key={x}
            href={"#" + x.toLowerCase()}
            onClick={() => setOpen(false)}
          >
            {x}
          </a>
        ))}
        <a className="join-btn" href="#join">
          JOIN ↗
        </a>
      </div>
      <button className="hamb" onClick={() => setOpen(!open)}>
        {open ? "×" : "☰"}
      </button>
    </nav>
  );
}
function App() {
  const [active, setActive] = useState("All");
  const [progress, setProgress] = useState(0);
  const [top, setTop] = useState(false);
  useEffect(() => {
    const scroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max ? scrollY / max : 0);
      setTop(scrollY > 800);
    };
    const move = (e) => {
      document.documentElement.style.setProperty("--mx", e.clientX + "px");
      document.documentElement.style.setProperty("--my", e.clientY + "px");
    };
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("pointermove", move, { passive: true });
    scroll();
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((x) => obs.observe(x));
    return () => {
      removeEventListener("scroll", scroll);
      removeEventListener("pointermove", move);
      obs.disconnect();
    };
  }, []);
  const filtered =
    active === "All" ? gallery : gallery.filter((x) => x[2] === active);
  return (
    <div id="top" className="app">
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="spotlight" />
      <div className="grid" />
      <div className="landscape" aria-hidden="true">
        <div className="moon" />
        <div className="mountain back-mountain" />
        <div className="mountain mid-mountain" />
        <div className="mountain front-mountain" />
        <div className="mist" />
        <div className="rain-lines" />
      </div>
      <Rain />
      <Nav />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <Reveal>
              <p className="eyebrow">● OFFICIAL ACM STUDENT CHAPTER · TULAS</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1>
                WE ARE
                <br />
                <span>COMPUTING.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="lead">
                A moving community of builders, thinkers and creators. We learn
                loudly, build boldly and turn curiosity into technology.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="actions">
                <a className="primary" href="#events">
                  EXPLORE EVENTS ↗
                </a>
                <a className="secondary" href="#about">
                  DISCOVER ACM ↓
                </a>
              </div>
            </Reveal>
          </div>
          <div className="orbit">
            <div className="orbit-ring r1" />
            <div className="orbit-ring r2" />
            <div className="orbit-ring r3" />
            <div className="orbit-core">
              <img src="/icon.png" />
            </div>
            <b className="orb-a">AI</b>
            <b className="orb-b">WEB</b>
            <b className="orb-c">UX</b>
          </div>
          <div className="hero-meta">
            <span>EST. 2015</span>
            <span>DEHRADUN · INDIA</span>
            <span>SCROLL ↓</span>
          </div>
        </section>
        <section id="about" className="section">
          <Reveal>
            <p className="label">01 / WHO WE ARE</p>
            <h2>
              NOT JUST A<br />
              <em>TECH CLUB.</em>
            </h2>
          </Reveal>
          <div className="about-grid">
            <Reveal>
              <p className="big">
                We create the kind of environment where a beginner can ship
                their first project, and an experienced developer can find their
                next challenge.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="muted">
                From workshops and competitions to community initiatives and
                collaborative builds, Tulas ACM is a place to learn by doing.
              </p>
            </Reveal>
          </div>
          <div className="stats">
            {[
              ["500+", "MEMBERS"],
              ["50+", "EVENTS"],
              ["100+", "PROJECTS"],
              ["10+", "YEARS OF ENERGY"],
            ].map(([n, l], i) => (
              <Reveal delay={i * 0.06} key={l}>
                <div>
                  <b>{n}</b>
                  <small>{l}</small>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        <div className="ticker">
          <div className="ticker-inner">
            {Array.from({ length: 3 }).map((_, i) => (
              <React.Fragment key={i}>
                <b>LEARN</b>
                <i>✦</i>
                <b>BUILD</b>
                <i>✦</i>
                <b>COMPETE</b>
                <i>✦</i>
                <b>CREATE</b>
                <i>✦</i>
                <b>CONNECT</b>
                <i>✦</i>
              </React.Fragment>
            ))}
          </div>
        </div>
        <section id="events" className="section event-section">
          <Reveal>
            <p className="label">02 / WHAT'S MOVING</p>
            <h2>
              EVENTS
              <br />
              <em>IN MOTION.</em>
            </h2>
          </Reveal>
          <div className="events">
            {events.map(([n, t, m, img], i) => (
              <Reveal delay={i * 0.06} key={t}>
                <a href="#join" className="event">
                  <span>{n}</span>
                  <img src={img} />
                  <div>
                    <small>{m}</small>
                    <h3>{t}</h3>
                    <p>EXPLORE EXPERIENCE ↗</p>
                  </div>
                  <strong>↗</strong>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="projects" className="section">
          <Reveal>
            <p className="label">03 / BUILD LAB</p>
            <h2>
              IDEAS
              <br />
              <em>THAT SHIP.</em>
            </h2>
          </Reveal>
          <div className="cards">
            {[
              ["/gallery/web.jpg", "01", "WEB LAB", "Interfaces that move."],
              [
                "/gallery/img4.jpg",
                "02",
                "COMPETITIVE",
                "Think faster. Code smarter.",
              ],
              [
                "/gallery/technology.jpg",
                "03",
                "SOCIAL IMPACT",
                "Technology with purpose.",
              ],
            ].map(([img, n, t, txt]) => (
              <Reveal key={n}>
                <article className="card">
                  <div className="photo">
                    <img src={img} />
                    <b>{n}</b>
                  </div>
                  <small>{t}</small>
                  <h3>{txt}</h3>
                  <a href="#join">VIEW PROJECT ↗</a>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="team" className="section team">
          <Reveal>
            <p className="label">04 / THE PEOPLE</p>
            <h2>
              MEET THE
              <br />
              <em>MAKERS.</em>
            </h2>
          </Reveal>
          <div className="people">
            {people.map(([img, n, r], i) => (
              <article className="person" key={n}>
                <div>
                  <img src={img} />
                  <b>0{i + 1}</b>
                </div>
                <small>{r}</small>
                <h3>{n}</h3>
              </article>
            ))}
          </div>
        </section>
        <section id="gallery" className="section gallery-section">
          <Reveal>
            <p className="label">05 / MOMENTS</p>
            <h2>
              THE
              <br />
              <em>MEMORY.</em>
            </h2>
          </Reveal>
          <div className="filters">
            {[
              "All",
              "COMMUNITY",
              "HACKATHON",
              "LEARN",
              "BUILD",
              "CONNECT",
              "COMPETE",
              "TOGETHER",
              "CREATE",
            ].map((x) => (
              <button
                className={active === x ? "active" : ""}
                onClick={() => setActive(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="gallery">
            {filtered.map(([src, t, c]) => (
              <figure key={src}>
                <img src={src} />
                <figcaption>
                  <small>{c}</small>
                  <b>{t}</b>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section id="join" className="join">
          <Rain dense />
          <div>
            <Reveal>
              <p className="label">06 / YOUR MOVE</p>
              <h2>
                MAKE
                <br />
                <em>NOISE.</em>
              </h2>
              <p>Join a community that keeps moving.</p>
              <a className="primary" href="mailto:acm@tulas.edu.in">
                JOIN TULAS ACM ↗
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-brand">
          <img src="/icon.png" />
          <b>
            TULAS ACM<small>STUDENT CHAPTER</small>
          </b>
        </div>
        <p>
          Learn. Build. Compete. Connect.
          <br />
          Because technology should keep moving.
        </p>
        <div>© 2026 Tulas ACM Student Chapter</div>
      </footer>
      {top && (
        <a className="back" href="#top">
          ↗
        </a>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
