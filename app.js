const hero = document.getElementById('hero');
const textArea = document.getElementById('text-area');
const dots = document.querySelectorAll('.dot');

const backgrounds = [
 
"none",
"none",
"none"
];


let current = 0;

function setSlide(index, direction) {
  // Add directional swipe animation
  if (direction === 'right') hero.classList.add('swipe-right');
  else hero.classList.add('swipe-left');

  // Text fade out in direction
  textArea.classList.add(direction === 'right' ? 'hide-right' : 'hide-left');

  // Switch background mid-animation
  setTimeout(() => {
    hero.style.background = backgrounds[index];
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
  }, 500);

  // Show text again after sweep
  setTimeout(() => {
    textArea.classList.remove('hide-right', 'hide-left');
    textArea.classList.add('show');
  }, 1000);

  // Clean up classes
  setTimeout(() => {
    hero.classList.remove('swipe-right', 'swipe-left');
    textArea.classList.remove('show');
  }, 1600);
}

function nextSlide() {
  current = (current + 1) % backgrounds.length;
  setSlide(current, 'right');
}

function prevSlide() {
  current = (current - 1 + backgrounds.length) % backgrounds.length;
  setSlide(current, 'left');
}

function goToSlide(index) {
  const direction = index > current ? 'right' : 'left';
  current = index;
  setSlide(index, direction);
}





// Fast Quote: show thank-you and clear fields after posting to hidden iframe
(function(){
function onSubmit(e){
try{
const form = e.target;
const status = document.getElementById('fqStatus');
const btn = document.getElementById('fastQuoteSubmit');
if(status) status.textContent = 'Thank you for contacting us. Someone will reach out shortly.';
if(btn){ btn.disabled = true; setTimeout(()=>{ btn.disabled = false; }, 1500); }
setTimeout(()=>{ try{ form.reset(); }catch(_){} }, 200);
}catch(_){ }
}
const ready = () => {
const form = document.getElementById('fastQuoteForm');
if(form && !form.__wired){ form.addEventListener('submit', onSubmit); form.__wired = true; }
};
if(document.readyState === 'loading'){
window.addEventListener('DOMContentLoaded', ready, {once:true});
} else { ready(); }
})();

// Flip button toggle (Call to Reserve)
(function(){
const callBtn = document.getElementById('callBtn');
if(callBtn){
callBtn.addEventListener('click', ()=>{
callBtn.classList.toggle('flipped');
});
}
})();

// === Easter egg: open/close logic + confetti (enhanced) ===
(function(){
const logoBtn = document.getElementById('logoEgg');
const overlay = document.getElementById('eggOverlay');
const closeBtn = document.getElementById('eggClose');
const canvas = document.getElementById('confettiCanvas');
if(!logoBtn || !overlay) return;

// Confetti burst
function launchConfetti(){
if(!canvas) return;
const ctx = canvas.getContext('2d');
const DPR = Math.max(1, window.devicePixelRatio || 1);
const w = canvas.width = Math.floor(window.innerWidth * DPR);
const h = canvas.height = Math.floor(window.innerHeight * DPR);
canvas.style.display = 'block';

const colors = ['#1e3a8a','#2563eb','#fbbf24','#10b981','#ef4444'];
const count = Math.min(5000, Math.floor((window.innerWidth+window.innerHeight)/6)); // more confetti
const particles = [];
// emit from upper-center-ish
const emitX = (window.innerWidth * DPR) / 2;
const emitY = (window.innerHeight * DPR) / 3; // more central

for(let i=0;i<count;i++){
const angle = Math.random() * 2 * Math.PI;
const speed = (Math.random()*10 + 6) * DPR; // faster & further
particles.push({
x: emitX,
y: emitY,
vx: Math.cos(angle)*speed,
vy: Math.sin(angle)*speed,
g: 0.0001*DPR,
w: (Math.random()*10 + 6) * DPR, // bigger pieces
h: (Math.random()*14 + 8) * DPR,
rot: Math.random()*Math.PI,
vr: (Math.random()-0.5)*0.3,
alpha: 1,
color: colors[Math.floor(Math.random()*colors.length)]
});
}

const start = performance.now();
function tick(t){
const elapsed = t - start;
ctx.clearRect(0,0,w,h);
particles.forEach(p=>{
p.vy += p.g;
p.x += p.vx;
p.y += p.vy;
p.rot += p.vr;
// fade out over time
p.alpha = Math.max(0, 1 - elapsed/2000); // longer fade
ctx.save();
ctx.globalAlpha = p.alpha;
ctx.translate(p.x, p.y);
ctx.rotate(p.rot);
ctx.fillStyle = p.color;
ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
ctx.restore();
});
if(elapsed < 2000){ requestAnimationFrame(tick); }
else { canvas.style.display = 'none'; ctx.clearRect(0,0,w,h); }
}
requestAnimationFrame(tick);
}

const open = () => { overlay.classList.add('show'); overlay.setAttribute('aria-hidden','false'); const sn = document.getElementById('ticketSerial'); if (sn) { const d = new Date(); const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth()+1).padStart(2,'0') + String(d.getDate()).padStart(2,'0'); const rand = Math.floor(Math.random()*900 + 100); sn.textContent = `${ymd}-${rand}`; } launchConfetti(); };
const close = () => { overlay.classList.remove('show'); overlay.setAttribute('aria-hidden','true'); };

logoBtn.addEventListener('click', open);
if(closeBtn) closeBtn.addEventListener('click', close);
overlay.addEventListener('click', (e)=>{ if(e.target === overlay) close(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });

// keep canvas sized on rotate/resizes for crispness
window.addEventListener('resize', ()=>{
if(!canvas || canvas.style.display==='none') return;
const DPR = Math.max(1, window.devicePixelRatio || 1);
canvas.width = Math.floor(window.innerWidth * DPR);
canvas.height = Math.floor(window.innerHeight * DPR);
});
})();