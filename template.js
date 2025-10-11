
const hero = document.getElementById('hero');
const textArea = document.getElementById('text-area');
const dots = document.querySelectorAll('.dot');

const backgrounds = [
  "transparent", // slide 1
  "transparent", // slide 2
  "transparent"  // slide 3
];

let current = 0;
let intervalId = null;
let isAnimating = false;

// Swipe animation logic
function setSlide(index, direction) {
  // Prevent overlapping animations
  if (isAnimating) return;
  isAnimating = true;

  // Start swipe animation
  if (direction === 'right') {
    hero.classList.add('swipe-right');
    textArea.classList.add('hide-right');
  } else {
    hero.classList.add('swipe-left');
    textArea.classList.add('hide-left');
  }

  // Switch background mid-animation
  setTimeout(() => {
    hero.style.background = backgrounds[index];
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
  }, 600);

  // Show content again
  setTimeout(() => {
    textArea.classList.remove('hide-right', 'hide-left');
    textArea.classList.add('show');
  }, 1200);

  // Cleanup and allow next animation
  setTimeout(() => {
    hero.classList.remove('swipe-right', 'swipe-left');
    textArea.classList.remove('show');
    isAnimating = false;
  }, 2000);
}

// Move to next slide
function nextSlide() {
  current = (current + 1) % backgrounds.length;
  setSlide(current, 'right');
}

// Start automatic infinite swiping
function startAutoSwipe() {
  stopAutoSwipe();
  intervalId = setInterval(() => {
    nextSlide();
  }, 6000); // Swipes every 6 seconds
}

// Stop automatic swiping
function stopAutoSwipe() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Pause on hover, resume on mouse leave
hero.addEventListener('mouseenter', stopAutoSwipe);
hero.addEventListener('mouseleave', startAutoSwipe);

// Optional: Pause when tab is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopAutoSwipe();
  } else {
    startAutoSwipe();
  }
});

// Initialize: set first background and start animation
hero.style.background = backgrounds[0];
dots[0].classList.add('active');
startAutoSwipe();



