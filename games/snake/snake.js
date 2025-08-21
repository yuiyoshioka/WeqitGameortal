import { initI18n } from '../../i18n.js';
import { writeClaim } from '../../web3.js';
import { CHAIN, getTxUrl } from '../../config.js';

initI18n(document);
const t = (k, def) => (document.querySelector(`[data-i18n="${k}"]`)?.textContent || def);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const size = 20, cells = canvas.width / size;

let snake = [{x:10,y:10}], dir = {x:1,y:0}, food = spawnFood(), score = 0, alive = true;
const scoreEl = document.getElementById('score');
const claimBtn = document.getElementById('claimBtn');

let touchStart = null;
canvas.addEventListener('touchstart', e => touchStart = e.changedTouches[0]);
canvas.addEventListener('touchend', e => {
  if (!touchStart) return;
  const dx = e.changedTouches[0].clientX - touchStart.clientX;
  const dy = e.changedTouches[0].clientY - touchStart.clientY;
  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && dir.x !== -1) dir = {x:1,y:0};
    else if (dx < 0 && dir.x !== 1) dir = {x:-1,y:0};
  } else {
    if (dy > 0 && dir.y !== -1) dir = {x:0,y:1};
    else if (dy < 0 && dir.y !== 1) dir = {x:0,y:-1};
  }
  touchStart = null;
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && dir.y !== 1) dir = {x:0,y:-1};
  if (e.key === 'ArrowDown' && dir.y !== -1) dir = {x:0,y:1};
  if (e.key === 'ArrowLeft' && dir.x !== 1) dir = {x:-1,y:0};
  if (e.key === 'ArrowRight' && dir.x !== -1) dir = {x:1,y:0};
});

function spawnFood(){
  return { x: Math.floor(Math.random()*cells), y: Math.floor(Math.random()*cells) }
}

function loop(){
  if (!alive) return;
  setTimeout(loop, 120);
  const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
  head.x = (head.x + cells) % cells;
  head.y = (head.y + cells) % cells;

  if (snake.some((s,i)=> i>0 && s.x===head.x && s.y===head.y)) { alive = false; claimBtn.disabled = true; return draw(true); }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y){
    score += 1;
    scoreEl.textContent = score;
    food = spawnFood();
    if (score % 10 === 0) claimBtn.disabled = false; // threshold contoh
  } else {
    snake.pop();
  }
  draw();
}

function draw(gameOver=false){
  ctx.fillStyle = '#0d1226';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // food
  ctx.fillStyle = '#ff4d4f';
  ctx.fillRect(food.x*size, food.y*size, size, size);

  // snake
  snake.forEach((p,i) => {
    ctx.fillStyle = i===0 ? '#00e5a8' : '#1de9b6';
    ctx.fillRect(p.x*size, p.y*size, size, size);
  });

  if (gameOver){
    ctx.fillStyle = 'rgba(0,0,0,.6)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText('Game Over', 130, 200);
  }
}

// CLAIM
claimBtn.addEventListener('click', async () => {
  try{
    if (score < 10) { alert(t('need_score','Need score ≥ 10 to claim')); return; }
    claimBtn.disabled = true;
    console.log(t('claim_calling','Sending claim transaction…'));
    const hash = await writeClaim([BigInt(score)]);
    alert(t('claim_done','Claim submitted!') + `\n${getTxUrl(hash)}`);
  }catch(err){
    console.error(err);
    alert(t('claim_fail','Claim failed') + `\n${err?.message||err}`);
    claimBtn.disabled = false;
  }
});

loop(); draw();
