// ==========================
// 3D IMAGE POSITIONING (FIXED ORDER)
// ==========================
const carouselInner = document.querySelector(".carousel-inner");
const images = document.querySelectorAll(".carousel-inner img");

const total = images.length;
const angle = 360 / total;
const radius = 400;

images.forEach((img, i) => {
  img.style.transform = `
    translate(-50%, -50%)
    rotateY(${i * angle}deg)
    translateZ(${radius}px)
  `;
});

// ==========================
// ROTATION SYSTEM (NEW)
// ==========================
let currentRotation = 0;
let autoSpeed = 0.05; // slow rotation
let isDragging = false;
let startX = 0;
let startRotation = 0;

function updateRotation() {
  carouselInner.style.transform = `rotateY(${currentRotation}deg)`;
}

function autoRotate() {
  if (!isDragging) {
    currentRotation += autoSpeed;
    updateRotation();
  }
  requestAnimationFrame(autoRotate);
}
autoRotate();

// Mouse drag
carouselInner.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startRotation = currentRotation;
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const delta = e.clientX - startX;
  currentRotation = startRotation + delta * 0.4;
  updateRotation();
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

// Touch swipe
carouselInner.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  startRotation = currentRotation;
});

window.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const delta = e.touches[0].clientX - startX;
  currentRotation = startRotation + delta * 0.4;
  updateRotation();
});

window.addEventListener("touchend", () => {
  isDragging = false;
});


// ==========================
// COUNTDOWN
// ==========================
const birthday = new Date("June 1, 2026 00:00:00").getTime();
const timer = document.getElementById("timer");
const heartsContainer = document.getElementById("hearts-container");
const butterfliesContainer = document.getElementById("butterflies-container");

const countdownInterval = setInterval(() => {
  const now = new Date().getTime();
  const distance = birthday - now;

  if (distance <= 0) {
    clearInterval(countdownInterval);
    timer.innerHTML = "🎉 It's Today!";
    burstHearts(40);
    launchFireworks();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);


// ==========================
// GIFT REVEAL
// ==========================
function revealGift() {
  const surprise = document.getElementById("surprise");
  surprise.classList.toggle("hidden");

  burstHearts(30);
  launchFireworks();
}


// ==========================
// LIGHTBOX
// ==========================
function showFullImage(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.src = src;
  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}


// ==========================
// MESSAGE SYSTEM
// ==========================
document.getElementById("message-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const input = document.getElementById("message-input");
  const message = input.value.trim();
  if (!message) return;

  const messages = JSON.parse(localStorage.getItem("birthdayMessages")) || [];
  messages.push({
    text: message,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("birthdayMessages", JSON.stringify(messages));
  input.value = "";
  alert("Message saved ❤️");
});


// ==========================
// HEARTS EFFECT
// ==========================
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent =
    ["💜","❤️","💙","💛","🧡","🤍","❤️‍🩹","💝","💘","💕","🫶"]
    [Math.floor(Math.random() * 11)];

  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${3 + Math.random() * 3}s`;
  heart.style.fontSize = `${18 + Math.random() * 24}px`;

  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}

function burstHearts(amount = 25) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createHeart, i * 120);
  }
}


// ==========================
// BUTTERFLY EFFECT
// ==========================
function createButterfly() {
  const butterfly = document.createElement("div");
  butterfly.className = "floating-butterfly";
  butterfly.textContent =
    ["🦋","💜","❤️","💙","💛","🧡","🤍","❤️‍🩹","💝","💘","💕","🫶"]
    [Math.floor(Math.random() * 12)];

  butterfly.style.left = `${Math.random() * 100}vw`;
  butterfly.style.animationDuration = `${6 + Math.random() * 5}s`;
  butterfly.style.fontSize = `${18 + Math.random() * 20}px`;

  butterfliesContainer.appendChild(butterfly);
  setTimeout(() => butterfly.remove(), 12000);
}

function startButterflyEffect() {
  setInterval(createButterfly, 500);
}


// ==========================
// SIMPLE FIREWORKS
// ==========================
function launchFireworks() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.textContent = "✨";
      sparkle.style.position = "fixed";
      sparkle.style.left = `${Math.random() * 100}vw`;
      sparkle.style.top = `${Math.random() * 100}vh`;
      sparkle.style.fontSize = `${18 + Math.random() * 30}px`;
      sparkle.style.zIndex = "1000";

      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    }, i * 150);
  }
}

startButterflyEffect();


// ==========================
// CAROUSEL IMAGE CLICK
// ==========================
document.querySelectorAll(".carousel-inner img").forEach(img => {
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    showFullImage(img.src);
  });
});


// ==========================
// OPEN PROPOSAL PAGE
// ==========================
function openProposal() {
  window.location.href = "proposal.html";
}

// ==========================
// LOVE LETTER
// ==========================

function openLetter() {
  document.getElementById("letter-overlay").classList.remove("hidden");
  burstHearts(25); // uses your existing heart effect
}

function closeLetter() {
  document.getElementById("letter-overlay").classList.add("hidden");
}