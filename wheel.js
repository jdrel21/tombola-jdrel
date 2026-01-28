const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const prizes = [
  "🎁 10 lei",
  "❌ Nimic",
  "🎉 5 lei",
  "🎟️ Reîncearcă",
  "🎁 20 lei",
  "❌ Nimic"
];

const colors = ["#f44336", "#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#607d8b"];
const slices = prizes.length;
const sliceAngle = 2 * Math.PI / slices;

let angle = 0;
let spinning = false;

function drawWheel() {
  for (let i = 0; i < slices; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, angle + i * sliceAngle, angle + (i + 1) * sliceAngle);
    ctx.fill();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(angle + i * sliceAngle + sliceAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.fillText(prizes[i], 140, 5);
    ctx.restore();
  }
}

drawWheel();

document.getElementById("spinBtn").onclick = () => {
  if (spinning) return;
  spinning = true;

  const spinAngle = Math.random() * 2000 + 2000;
  const duration = 3000;
  const start = Date.now();

  function animate() {
    const now = Date.now();
    const elapsed = now - start;
    const progress = elapsed / duration;

    angle += (spinAngle / duration) * Math.PI / 180;
    ctx.clearRect(0, 0, 300, 300);
    drawWheel();

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      const index = slices - Math.floor((angle % (2 * Math.PI)) / sliceAngle) - 1;
      alert("Ai câștigat: " + prizes[index]);
    }
  }

  animate();
};
