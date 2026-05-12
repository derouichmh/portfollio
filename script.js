/* ============================================================
   MOHA DEROUICH - PREMIUM SLAM PORTFOLIO JS
   ============================================================ */

// 1. CURSORS (SOUYRIS OPTIMISÉE)
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Le petit point suit instantanément
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Animation fluide pour le cercle qui suit (Lerping)
function animateCursor() {
    let dx = mouseX - followerX;
    let dy = mouseY - followerY;
    
    followerX += dx * 0.15; // Vitesse de suivi (0.15 = fluide)
    followerY += dy * 0.15;
    
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 2. TYPING EFFECT
const typingText = document.getElementById('typing-text');
const phrases = [
    "Développeur Fullstack en devenir",
    "Expert en Infrastructure & Réseaux",
    "Passionné par la Cybersécurité",
    "Étudiant en BTS SIO SLAM @ Ingetis"
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIdx];
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 40 : 80);
    }
}
type();

// 3. MAGNETIC PARTICLES
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 245, 212, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 150;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = force * forceDirectionX * this.density;
        let directionY = force * forceDirectionY * this.density;

        if (distance < maxDistance) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 150; i++) particles.push(new Particle());
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init();
animate();

// 4. QUICK VIEW
const qvBtn = document.getElementById('quick-view-btn');
const qvModal = document.getElementById('quick-view-modal');
const closeBtn = document.querySelector('.close-modal');

qvBtn.onclick = () => qvModal.style.display = 'flex';
closeBtn.onclick = () => qvModal.style.display = 'none';
window.onclick = (e) => { if (e.target == qvModal) qvModal.style.display = 'none'; };
