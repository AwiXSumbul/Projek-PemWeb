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


function typeNextChar() {
  const letterBox = document.getElementById('letterBox');
  const progressBar = document.getElementById('progressBar');
  const btnNext = document.getElementById('btnNext');

  if (currentP < letterParagraphs.length) {
    const text = letterParagraphs[currentP];
    
    if (currentChar === 0) {
      const pTag = document.createElement('p');
      pTag.style.marginBottom = '12px';
      pTag.id = `p-${currentP}`;
      letterBox.appendChild(pTag);
    }

    const currentPTag = document.getElementById(`p-${currentP}`);
    currentPTag.innerHTML += text.charAt(currentChar);
    currentChar++;

    const totalChars = letterParagraphs.join('').length;
    let typedChars = 0;
    for (let i = 0; i < currentP; i++) typedChars += letterParagraphs[i].length;
    typedChars += currentChar;
    const progressPercent = Math.min(100, (typedChars / totalChars) * 100);
    progressBar.style.width = `${progressPercent}%`;

    letterBox.scrollTop = letterBox.scrollHeight;

    if (currentChar < text.length) {
      setTimeout(typeNextChar, 35);
    } else {
      currentP++;
      currentChar = 0;
      setTimeout(typeNextChar, 350);
    }
  } else {
    btnNext.disabled = false;
    btnNext.style.boxShadow = '0 0 20px rgba(255, 65, 108, 0.8)';
    playChime();
  }
}

function goToStep(stepNumber) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`step${stepNumber}`);
  if (target) {
    target.classList.add('active');
  }

  if (stepNumber === 2) {
    initStep2Logic();
  }
}

let timeLeft = 30;
let isWarningPeriod = false;
let timerInterval = null;
let warningCheckInterval = null;

function initStep2Logic() {
  const btnTolak = document.getElementById('btnTolak');
  const btnTerima = document.getElementById('btnTerima');
  const mainCard = document.getElementById('mainCard');
  const timerBadge = document.getElementById('timerBadge');

  resetTolakPosition();

  timerInterval = setInterval(() => {
    timeLeft--;
    if (timerBadge) timerBadge.innerText = `Waktu Tolak: ${timeLeft}s`;

    if (timeLeft <= 5 && timeLeft > 0) {
      if (btnTerima) btnTerima.classList.add('breathe-animation');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(warningCheckInterval);
      if (btnTolak) {
        btnTolak.style.transform = 'scale(0)';
        setTimeout(() => {
          if (btnTolak.parentNode) btnTolak.remove();
        }, 300);
      }
      if (timerBadge) timerBadge.innerText = 'Waktu Tolak Habis! Cuma ada TERIMA! 🥰';
    }
  }, 1000);

  warningCheckInterval = setInterval(() => {
    if (timeLeft > 0 && btnTolak) {
      isWarningPeriod = true;
      btnTolak.classList.add('warning-mode');
      btnTolak.innerText = 'Pencet Aku! 😈';

      setTimeout(() => {
        isWarningPeriod = false;
        btnTolak.classList.remove('warning-mode');
        btnTolak.innerText = 'Tolak 😜';
      }, 1500);
    }
  }, 5000);

  const evadeHandler = (e) => {
    if (isWarningPeriod || !btnTolak || !mainCard) return;

    const cardRect = mainCard.getBoundingClientRect();
    const btnRect = btnTolak.getBoundingClientRect();

    const maxX = cardRect.width - btnRect.width - 40;
    const maxY = cardRect.height - btnRect.height - 40;

    const randomX = Math.max(20, Math.floor(Math.random() * maxX)) - (cardRect.width / 2) + 60;
    const randomY = Math.max(20, Math.floor(Math.random() * maxY)) - (cardRect.height / 2) + 60;

    btnTolak.style.transform = `translate(${randomX}px, ${randomY}px)`;

    const teksKocak = ["Eits gak kena! 😜", "Gak dapet kan! 😂", "Dah lah TERIMA aja! 🥰", "Wusss meleset! 💨"];
    btnTolak.innerText = teksKocak[Math.floor(Math.random() * teksKocak.length)];
  };

  if (btnTolak) {
    btnTolak.addEventListener('mouseover', evadeHandler);
    btnTolak.addEventListener('touchstart', evadeHandler);

    btnTolak.addEventListener('click', () => {
      const jumpscare = document.getElementById('jumpscareOverlay');
      if (jumpscare) jumpscare.classList.add('active');
      
      playJumpscareSound();

      setTimeout(() => {
        if (jumpscare) jumpscare.classList.remove('active');
      }, 3000);
    });
  }
}

function resetTolakPosition() {
  const btnTolak = document.getElementById('btnTolak');
  if (btnTolak) {
    btnTolak.style.position = 'relative';
    btnTolak.style.transform = 'translate(0, 0)';
  }
}

function terimaCinta() {
  clearInterval(timerInterval);
  clearInterval(warningCheckInterval);
  goToStep(3);
  startConfetti();
  startLoveMeter();
  startRomanticMusic();
  spawnBalloonsContinuously();
}

function startLoveMeter() {
  let percent = 0;
  const fill = document.getElementById('loveFill');
  const text = document.getElementById('loveText');

  const interval = setInterval(() => {
    percent += 15000;
    if (percent >= 1000000) {
      percent = 1000000;
      if (fill) fill.style.width = '100%';
      if (text) text.innerText = '1,000,000% (INFINITY LOVE! 💖)';
      clearInterval(interval);
    } else {
      if (fill) fill.style.width = `${(percent / 1000000) * 100}%`;
      if (text) text.innerText = `${percent.toLocaleString()}%`;
    }
  }, 30);
}

function spawnBalloonsContinuously() {
  const container = document.getElementById('balloonContainer');
  if (!container) return;
  let laneIndex = 0;

  setInterval(() => {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';

    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    const gombal = balloonGombalan[Math.floor(Math.random() * balloonGombalan.length)];

    const leftPos = 8 + (laneIndex * 18) + (Math.random() * 6);
    laneIndex = (laneIndex + 1) % 5;

    balloon.style.left = `${leftPos}%`;

    balloon.innerHTML = `
      <div class="balloon-body" style="background:${color};">
        ${gombal}
      </div>
      <div class="balloon-knot" style="background:${color};"></div>
      <div class="balloon-string"></div>
    `;

    balloon.addEventListener('click', (e) => {
      e.stopPropagation();
      balloon.classList.toggle('paused');
    });

    container.appendChild(balloon);

    setTimeout(() => {
      if (!balloon.classList.contains('paused')) {
        balloon.remove();
      }
    }, 23000);

  }, 2200);
}

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playChime() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch(e){}
}

function playJumpscareSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 800;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    const screech = ctx.createOscillator();
    const screechGain = ctx.createGain();
    screech.type = 'sawtooth';
    screech.frequency.setValueAtTime(1200, now);
    screech.frequency.linearRampToValueAtTime(2800, now + 0.15);
    screech.frequency.exponentialRampToValueAtTime(150, now + 0.8);

    screechGain.gain.setValueAtTime(0.9, now);
    screechGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

    screech.connect(screechGain);
    screechGain.connect(ctx.destination);

    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.type = 'sine';
    bass.frequency.setValueAtTime(220, now);
    bass.frequency.exponentialRampToValueAtTime(30, now + 0.8);

    bassGain.gain.setValueAtTime(1.0, now);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

    bass.connect(bassGain);
    bassGain.connect(ctx.destination);

    noise.start(now);
    screech.start(now);
    bass.start(now);

    noise.stop(now + 0.8);
    screech.stop(now + 0.8);
    bass.stop(now + 0.8);

  } catch(e) {
    console.error("Audio error:", e);
  }
}


function startRomanticMusic() {
  try {
    const ctx = getAudioContext();
    const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 392.00, 329.63];
    let noteIndex = 0;

    setInterval(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(notes[noteIndex], ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
      noteIndex = (noteIndex + 1) % notes.length;
    }, 400);
  } catch(e){}
}

function startConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 12 + 6,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      if (p.y > canvas.height) p.y = -20;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(render);
  }
  render();
}