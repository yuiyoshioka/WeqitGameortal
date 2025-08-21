import { initI18n, setLang } from './i18n.js';
import { getTokenUrl, TOKEN_ADDRESS } from './config.js';
import { initWeb3 } from './web3.js';
import { initHero } from './three-hero.js';

const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

initI18n(document);
$('#year').textContent = new Date().getFullYear();

const nav = $('#nav'); const navToggle = $('.nav-toggle');
navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Language toggle
$('#langId')?.addEventListener('click', ()=> setLang('id'));
$('#langEn')?.addEventListener('click', ()=> setLang('en'));

// Web3Modal init
initWeb3();

// BaseScan link
const basescanLink = $('#basescanLink');
if (TOKEN_ADDRESS) { basescanLink.href = getTokenUrl(TOKEN_ADDRESS); }

// Hero 3D
const heroCanvas = $('#heroCanvas');
try { initHero(heroCanvas); } catch { /* fallback silent */ }

// Game list
const games = [
  {
    id: 'snake',
    title: 'Snake',
    genre: 'Arcade',
    status: 'live',
    reward: { perClaim: 5, threshold: 'score ≥ 10', dailyCap: 3 },
    url: 'games/snake/index.html',
    thumbText: 'SNAKE',
    badge: 'Popular',
    desc: 'Eat, grow, claim tokens at milestones.'
  },
  {
    id: 'clicker',
    title: 'Tap Clicker',
    genre: 'Casual',
    status: 'soon',
    reward: null,
    url: '#',
    thumbText: 'SOON',
    badge: 'Soon',
    desc: 'Tap to earn — coming soon.'
  },
  {
    id: 'guess',
    title: 'Number Guess',
    genre: 'Puzzle',
    status: 'soon',
    reward: null,
    url: '#',
    thumbText: 'SOON',
    badge: 'Soon',
    desc: 'Guess & win — coming soon.'
  }
];

function t(key, fallback){
  return document.querySelector(`[data-i18n="${key}"]`)?.textContent || fallback || key;
}

function renderGames(){
  const grid = $('#gameGrid'); grid.innerHTML = '';
  games.forEach(g=>{
    const el = document.createElement('article'); el.className = 'card';
    el.innerHTML = `
      <div class="thumb">${g.badge ? `<span class="badge">${g.badge}</span>`:''}${g.thumbText}</div>
      <div class="card-body">
        <div class="meta">
          <span class="pill">${g.genre}</span>
          <span class="pill">${g.status==='live'?'Live':'Soon'}</span>
          ${g.reward ? `<span class="pill">Reward: ${g.reward.perClaim}</span>` : ''}
        </div>
        <h3>${g.title}</h3>
        <p class="muted">${g.desc}</p>
        <div class="actions">
          <a class="btn primary" href="${g.url}" ${g.status==='live'?'':'aria-disabled="true" style="pointer-events:none;opacity:.5"'}>${t('play','Play')}</a>
          <button class="btn outline details" data-id="${g.id}">${t('details','Details')}</button>
        </div>
      </div>
    `;
    grid.appendChild(el);
  });
  $$('.details', grid).forEach(btn => btn.addEventListener('click', openDetails));
}
renderGames();

function openDetails(e){
  const id = e.currentTarget.dataset.id;
  const g = games.find(x=>x.id===id); if(!g) return;
  alert(`${g.title}\n\n${g.desc}\n${g.reward ? `${t('reward_per_claim','Per claim')}: ${g.reward.perClaim}\n${t('reward_threshold','Threshold')}: ${g.reward.threshold}\n${t('reward_dailycap','Daily cap')}: ${g.reward.dailyCap}` : t('modal_reward_na','Reward not available yet.')}`);
}
