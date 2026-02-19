// Countdown
const birthday = new Date("June 1, 2026 00:00:00").getTime();
const timer = document.getElementById("timer");

setInterval(() => {
  const now = new Date().getTime();
  const distance = birthday - now;

  if (distance < 0) {
    timer.innerHTML = "🎉 It's Today!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// Reveal Gift
function revealGift() {
  document.getElementById("surprise").classList.toggle("hidden");
}

// Lightbox
// function showFullImage(src) {
//   const lightbox = document.getElementById("lightbox");
//   const img = document.getElementById("lightbox-img");

//   img.src = src;
//   lightbox.classList.remove("hidden");
// }

// Close button fix
function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}

function showFullImage(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.src = src;
  lightbox.classList.remove("hidden");
}

document.getElementById("message-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const message = document.getElementById("message-input").value;

  fetch("/save-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Message saved ❤️");
      document.getElementById("message-input").value = "";
    } else {
      alert("Error saving message");
    }
  })
  .catch(() => {
    alert("Server error");
  });
});
