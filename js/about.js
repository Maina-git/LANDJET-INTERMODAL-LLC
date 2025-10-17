const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navlinks = document.querySelector('.header .container.nav  .navlinks');
const cta = document.querySelector(".header .container.nav .cta");





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


/* 🌍 Interactive Map */
document.addEventListener('DOMContentLoaded', () => {
  const infoBox = document.getElementById('infoBox');
  const infoTitle = document.getElementById('infoTitle');
  const infoText = document.getElementById('infoText');
  const closeBtn = document.getElementById('closeBtn');
  const sidePanel = document.getElementById('sidePanel');
  const panelText = document.getElementById('panelText');
  const closePanelBtn = document.getElementById('closePanelBtn');
  const mapContainer = document.getElementById('mapContainer');
  const zoomIn = document.getElementById('zoomIn');
  const zoomOut = document.getElementById('zoomOut');

  // --- REGION AREAS ---
  const areas = {
    "los-angeles": { title: "Los Angeles Area", text: "Covers the LA Metro region, Santa Monica, and Long Beach." },
    "san-diego": { title: "San Diego", text: "Includes coastal and inland San Diego regions." },
    "palm-springs": { title: "Palm Springs", text: "Covers desert and surrounding communities." }
  };

  // --- INDIVIDUAL LOCATIONS ---
  const locations = {
    "lancaster": { title: "Lancaster", text: "A fast-growing city in northern Los Angeles County." },
    "santa-clarita": { title: "Santa Clarita", text: "Known for Six Flags Magic Mountain and its scenic valleys." },
    "thousand-oaks": { title: "Thousand Oaks", text: "Beautiful suburban area northwest of LA." },
    "pasadena": { title: "Pasadena", text: "Home to the Rose Parade and California Institute of Technology." },
    "san-bernardino": { title: "San Bernardino", text: "Major city in the Inland Empire region of Southern California." },
    "palm-springs": { title: "Palm Springs", text: "Desert resort city known for hot springs and golf courses." },
    "murrieta": { title: "Murrieta", text: "Rapidly growing community in southwestern Riverside County." },
    "huntington-beach": { title: "Huntington Beach", text: "Coastal city famous for surf culture and beaches." },
    "san-diego": { title: "San Diego", text: "Vibrant coastal city known for beaches and the San Diego Zoo." },
    "tijuana": { title: "Tijuana", text: "Bustling Mexican border city near San Diego." }
  };

  // --- DISPLAY INFO FOR REGIONS ---
  function showInfo(id) {
    const data = areas[id];
    if (!data) return;

    infoTitle.textContent = data.title;
    infoText.textContent = data.text;
    panelText.textContent = data.text;

    infoBox.classList.add('active');
    sidePanel.classList.add('active');
  }

  // --- DISPLAY INFO FOR LOCATIONS (pins) ---
  function showLocation(id) {
    const data = locations[id];
    if (!data) return;

    infoTitle.textContent = data.title;
    infoText.textContent = data.text;
    panelText.textContent = data.text;

    infoBox.classList.add('active');
    sidePanel.classList.add('active');
  }

  // --- CLOSE BUTTONS ---
  closeBtn.addEventListener('click', () => infoBox.classList.remove('active'));
  closePanelBtn.addEventListener('click', () => sidePanel.classList.remove('active'));

  // --- CLICKABLE REGIONS ---
  Object.keys(areas).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => showInfo(id));
    } else {
      console.warn(`⚠️ Missing polygon element for ID: ${id}`);
    }
  });

  // --- CLICKABLE PINS ---
  document.querySelectorAll('.pin').forEach(pin => {
    const id = pin.dataset.area;
    pin.addEventListener('click', () => showLocation(id));
  });

  // --- ZOOM & PAN FUNCTIONALITY ---
  let zoom = 1;
  let translateX = 0, translateY = 0;
  let isDragging = false;
  let startX, startY;

  function updateTransform() {
    mapContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoom})`;
  }

  zoomIn.addEventListener('click', () => {
    zoom = Math.min(3, zoom + 0.2);
    updateTransform();
  });

  zoomOut.addEventListener('click', () => {
    zoom = Math.max(1, zoom - 0.2);
    if (zoom === 1) {
      translateX = 0;
      translateY = 0;
    }
    updateTransform();
  });

  // --- DRAG TO MOVE MAP ---
  mapContainer.addEventListener('mousedown', (e) => {
    if (zoom <= 1) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    mapContainer.classList.add('dragging');
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    mapContainer.classList.remove('dragging');
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
  });

  // --- TOUCH SUPPORT ---
  mapContainer.addEventListener('touchstart', (e) => {
    if (zoom <= 1) return;
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX - translateX;
    startY = touch.clientY - translateY;
    mapContainer.classList.add('dragging');
  });

  mapContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    translateX = touch.clientX - startX;
    translateY = touch.clientY - startY;
    updateTransform();
  });

  mapContainer.addEventListener('touchend', () => {
    isDragging = false;
    mapContainer.classList.remove('dragging');
  });

  // --- CLOSE INFO WHEN CLICKING OUTSIDE ---
  document.addEventListener('click', (e) => {
    if (
      !infoBox.contains(e.target) &&
      !e.target.closest('polygon') &&
      !e.target.classList.contains('pin')
    ) {
      infoBox.classList.remove('active');
    }
  });
});















