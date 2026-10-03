const letterParagraphs = [
  "Hai kamu yang selalu ada di pikiranku... 😊",
  "Sejak pertama kali mengenalmu, hariku terasa jauh lebih hangat dan berwarna.",
  "Kamu punya senyuman manis yang sanggup mencairkan rasa lelahku di setiap hari.",
  "Aku sadar, aku bukan orang yang sempurna. Tapi di sampingmu, aku selalu ingin menjadi versi diriku yang terbaik.",
  "Satu ditambah satu sama dengan dua. Tapi aku dan kamu? Semoga bisa jadi satu selamanya. 🌹",
  "Sumedang kota tahu, kalau kamu tahu gak? Aku tuh cinta banget sama kamu! 😆",
  "Lewat surat kecil ini, aku mau mengungkapkan semua rasa cinta yang tersimpan jujur di lubuk hatiku.",
  "Maukah kamu berjalan berdampingan bersamaku, melengkapi setiap bab kehidupan kita bersama? ✨"
];

const gombalTemplates = [
  "Kamu tahu bedanya kamu sama bintang? Bintang di langit, kamu di hatiku! 💖",
  "Bisa tolong mundur dikit gak? Kamu cantiknya kebangetan! ✨",
  "Mau tau obat capek paling ampuh? Dengar suara kamu! 🥰",
  "Kalau cinta itu lomba lari, kamu juaranya karena lari terus di pikiranku! 🏃‍♀️💕",
  "HP aku sinyalnya 5G, tapi hatiku sinyalnya cuma ke kamu! 📶❤️",
  "Semoga kita kaya sepatu ya, selalu berpasangan dan jalan bareng! 👟✨",
  "Bukan cuma kopi yang bikin ketagihan, senyum kamu juga! ☕😊",
  "Kamu ada bawa peta gak? Aku kesasar di mata indahmu! 🗺️😍",
  "Aku tanpamu bagaikan ambulan tanpa 'wiuwiewiu'! 🚑😜",
  "Rumah apa yang paling bahagia? Rumah tangga kita nanti! 🏠💖",
  "Tahu gak kenapa air laut rasanya asin? Soalnya manisnya udah borong sama kamu! 🌊🍬",
  "Kamu tuh kaya wifi, bikin aku mau connect terus! 📶😍",
  "Cita-cita aku dulu banyak, sekarang cuma satu: bahagiain kamu! 👑💖",
  "Tolong jangan sering tersenum ya, kasihan manisnya gula kalah saing! 🍯😆",
  "Kamu punya pensil warna gak? Soalnya kamu mewarnai hariku! 🎨💕"
];
const balloonGombalan = [];
for (let i = 1; i <= 150; i++) {
  const base = gombalTemplates[(i - 1) % gombalTemplates.length];
  balloonGombalan.push(base);
}

const balloonColors = ['#ff758c', '#ff4b2b', '#11998e', '#8e44ad', '#f39c12', '#e84393', '#00cec9'];

/* -------------------------------------------------------------
   HUJAN HATI BACKGROUND ANIMATION
------------------------------------------------------------- */
function initHeartsBackground() {
  const canvas = document.getElementById('heartsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hearts = [];
  const heartShapes = ['💖', '💕', '🌸', '✨', '❤️'];

  for (let i = 0; i < 35; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 18 + 12,
      speedY: Math.random() * 1.5 + 0.8,
      speedX: Math.random() * 1 - 0.5,
      text: heartShapes[Math.floor(Math.random() * heartShapes.length)]
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
      ctx.font = `${h.size}px serif`;
      ctx.fillText(h.text, h.x, h.y);
      h.y += h.speedY;
      h.x += h.speedX;

      if (h.y > canvas.height + 30) {
        h.y = -20;
        h.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}
window.addEventListener('load', initHeartsBackground);

function openEnvelope() {
  goToStep(1);
  setTimeout(typeNextChar, 300);
}

let currentP = 0;
let currentChar = 0;
