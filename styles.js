:root{
  --bg:#0A0F1F; --card:#121A2E; --muted:#A3B2CF; --text:#E8F0FF;
  --primary:#0052FF; --accent:#0EE6B7; --line:rgba(255,255,255,.08);
}
*{box-sizing:border-box}
html,body{margin:0}
body{font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
.container{max-width:1100px;margin:auto;padding:0 1rem}

/* Header */
.header{position:sticky;top:0;z-index:40;background:rgba(10,15,31,.6);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;gap:1rem;padding:.8rem 0}
.brand{display:flex;align-items:center;gap:.6rem;text-decoration:none;color:var(--text);font-weight:800}
.logo{color:var(--accent)}
.nav-links{display:flex;gap:1rem;margin-left:auto}
.nav-links a{color:var(--muted);text-decoration:none}
.nav-links a:hover{color:var(--text)}
.lang-switch{display:flex;gap:.4rem;margin-right:.6rem}
.lang-switch button{border:1px solid var(--line);background:transparent;color:var(--text);border-radius:.5rem;padding:.35rem .55rem;cursor:pointer}
.nav-toggle{display:none;border:1px solid var(--line);background:transparent;color:var(--text);border-radius:.5rem;padding:.4rem .6rem}
@media (max-width:900px){
  .nav-links{display:none;position:absolute;right:1rem;top:3.4rem;background:#0f1630;border:1px solid var(--line);padding:.6rem;border-radius:.6rem;flex-direction:column}
  .nav-links.open{display:flex}
  .nav-toggle{display:inline-block;margin-left:auto}
}

/* HERO 3D */
.hero{position:relative;padding:4rem 0 3rem;border-bottom:1px solid var(--line);overflow:hidden}
.hero-canvas{position:absolute;inset:0;z-index:0;pointer-events:none}
.hero-inner{position:relative;z-index:1;display:grid;grid-template-columns:1.1fr .9fr;gap:2rem;align-items:center}
.hero h1{font-size:clamp(1.8rem,3.5vw,3rem);line-height:1.15;margin:.2rem 0}
.hero p{color:var(--muted);max-width:52ch}
.cta{display:flex;gap:.8rem;margin-top:1rem}
.btn{display:inline-flex;align-items:center;justify-content:center;border:1px solid transparent;border-radius:.6rem;padding:.6rem .9rem;font-weight:600;cursor:pointer}
.btn.primary{background:linear-gradient(135deg,var(--primary),#3b82f6);color:white}
.btn.ghost{border-color:var(--line);background:transparent;color:var(--text)}
.btn.outline{border-color:var(--line);background:transparent;color:var(--text)}

/* Sections */
.section{padding:3rem 0}
.section.alt{background:linear-gradient(180deg,rgba(255,255,255,.03),transparent)}
.section h2{margin:0 0 .5rem}
.muted{color:var(--muted)}

/* Cards + 3D tilt */
.grid{display:grid;gap:1rem}
.cards{grid-template-columns:repeat(3,minmax(0,1fr))}
@media (max-width:900px){.cards{grid-template-columns:1fr}}
.card{background:var(--card);border:1px solid var(--line);border-radius:1rem;overflow:hidden;display:flex;flex-direction:column;transform-style:preserve-3d;transition:transform .2s ease, box-shadow .2s ease}
.card:hover{transform:perspective(800px) rotateX(4deg) rotateY(-4deg); box-shadow:0 10px 30px rgba(0,0,0,.25)}
.thumb{position:relative;aspect-ratio:16/9;background:#0d1226;display:grid;place-items:center;color:#7aa2ff;font-weight:800;font-size:1.1rem}
.badge{position:absolute;margin:.6rem;background:linear-gradient(135deg,var(--primary),#3b82f6);color:#fff;padding:.15rem .5rem;border-radius:999px;font-size:.75rem}
.card-body{padding:1rem;display:flex;flex-direction:column;gap:.5rem}
.meta{display:flex;gap:.4rem;flex-wrap:wrap}
.pill{border:1px solid var(--line);border-radius:999px;padding:.15rem .5rem;color:var(--muted);font-size:.8rem}
.actions{display:flex;gap:.5rem;margin-top:.5rem}

/* Steps */
.steps{grid-template-columns:repeat(3,minmax(0,1fr))}
@media (max-width:900px){.steps{grid-template-columns:1fr}}
.step{background:var(--card);border:1px solid var(--line);border-radius:.9rem;padding:1rem}
.step-num{width:32px;height:32px;border-radius:999px;background:#1b2550;display:grid;place-items:center;font-weight:700;margin-bottom:.5rem}

/* Token */
.token-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem}
@media (max-width:900px){.token-stats{grid-template-columns:repeat(2,1fr)}}
.stat{background:var(--card);border:1px solid var(--line);border-radius:.9rem;padding:1rem}
.label{color:var(--muted);font-size:.85rem}
.value{font-size:1.4rem;font-weight:800}
.links{display:flex;gap:.6rem;margin-top:1rem}

/* Roadmap */
.timeline{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
@media (max-width:900px){.timeline{grid-template-columns:1fr}}
.titem{background:var(--card);border:1px solid var(--line);border-radius:.9rem;padding:1rem}

/* Footer */
.footer{border-top:1px solid var(--line);padding:1.2rem 0}
.fwrap{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.foot-links a{color:var(--muted);text-decoration:none;margin-left:.8rem}
.foot-links a:hover{color:var(--text)}

/* Modal (optional hook; left out for brevity in this bundle) */
