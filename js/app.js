const hero = document.getElementById('hero');
const heroContent = document.querySelector('.hero-content');
const textArea = document.getElementById('text-area');
const dots = document.querySelectorAll('.dot');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const cta = document.querySelector('.header .container.nav .cta'); 


const backgroundImages = [
  "url('assets/home/port-1845350_1280.jpg')",
  "url('assets/home/canada-784392_1280.jpg')",
  "url('assets/home/truck-4349523_1280.jpg')"
];

let current = 0;
let intervalId = null;
let isAnimating = false;

function setSlide(index, direction){
  if(isAnimating) return;
  isAnimating = true;

 if(direction === "right"){
  hero.classList.add('swipe-right');
  textArea.classList.add('hide-right');
 }else{
  hero.classList.add('swipe-left');
  textArea.classList.add('hide-left');
 }

setTimeout(()=>{
  heroContent.style.backgroundImage = backgroundImages[index];
  dots.forEach(d=>d.classList.remove('active'));
  dots[index].classList.add('active');
}, 600);

setTimeout(()=>{
  textArea.classList.remove('hide-right', 'hide-left');
  textArea.classList.add('show');
}, 1200);

setTimeout(()=>{
  hero.classList.remove('swipe-right', 'swipe-left');
  textArea.classList.remove('show');
  isAnimating = false;
}, 2000);
}

function prevSlide(){
  current = (current - 1 + backgroundImages.length) % backgroundImages.length;
  setSlide(current, 'left');
}
function nextSlide(){
  current = (current + 1) % backgroundImages.length;
  setSlide(current, 'right');
}

function startAutoSwipe(){
  stopAutoSwipe();
  intervalId = setInterval(()=>{
    nextSlide();
  }, 6000);
}

function stopAutoSwipe(){
  if(intervalId){
    clearInterval(intervalId);
    intervalId = null;
  }
}

hero.addEventListener('mouseenter', stopAutoSwipe);
hero.addEventListener('mouseleave', startAutoSwipe);

document.addEventListener('visibilitychange', ()=>{
  if(document.hidden){
    stopAutoSwipe();
  }else{
    startAutoSwipe();
  }
});
heroContent.style.backgroundImage = backgroundImages[0];
dots[0].classList.add('active');

//Toggler
const navlinks = document.querySelector('.header .container.nav  .navlinks');

if(mobileMenuToggle){
  mobileMenuToggle.addEventListener("click", ()=>{
    navlinks.classList.toggle("active");
    cta.classList.toggle('active');
  const icon = mobileMenuToggle.querySelector('i');
  if(icon){
    if(navlinks.classList.contains('active')){
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    }else{
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }
  });
}

const navLinks = document.querySelectorAll('.header .container.nav .navlinks a');
navLinks.forEach(link=>{
  link.addEventListener('click', ()=>{
    navlinks.classList.remove('active');
    cta.classList.remove('active');

    const icon = mobileMenuToggle.querySelector('i');
    if(icon){
      icon.classList.remove('fa-items');
      icon.classList.add('fa-bars');
    }
  });
});
document.addEventListener("click", (e)=>{
  if(!e.target.closest('.header .container.nav')){
    navlinks.classList.remove('active');
    cta.classList.remove('active');

    const icon = mobileMenuToggle.querySelector("i");
    if(icon){
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }
});


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





















