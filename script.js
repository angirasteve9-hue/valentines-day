// Get DOM elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const buttonsContainer = document.getElementById('buttonsContainer');
const mainContent = document.getElementById('mainContent');
const successMessage = document.getElementById('successMessage');
const heartsContainer = document.getElementById('heartsContainer');
const confettiCanvas = document.getElementById('confettiCanvas');

// Falling hearts animation
function createFallingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    
    // Random heart symbols
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    // Random position
    heart.style.left = Math.random() * 100 + '%';
    
    // Random size
    const size = 15 + Math.random() * 20;
    heart.style.fontSize = size + 'px';
    
    // Random animation duration
    const duration = 8 + Math.random() * 7;
    heart.style.animationDuration = duration + 's';
    
    // Random delay
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, (duration + 2) * 1000);
}

// Create initial falling hearts
for (let i = 0; i < 15; i++) {
    createFallingHeart();
}

// Continuously create new hearts
setInterval(createFallingHeart, 800);

// Floating sparkles
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.textContent = '✨';
    
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    
    const delay = Math.random() * 2;
    sparkle.style.animationDelay = delay + 's';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 3000 + delay * 1000);
}

// Create sparkles periodically
setInterval(createSparkle, 1500);

// Runaway NO button logic
let noBtnAttempts = 0;

function moveNoButton() {
    noBtnAttempts++;
    
    // Get button and container dimensions
    const containerRect = buttonsContainer.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate safe movement area
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = 100; // Vertical movement range
    
    // Generate random position
    let newX = Math.random() * maxX - (maxX / 2);
    let newY = Math.random() * maxY - (maxY / 2);
    
    // Make the button smaller on each attempt
    const newSize = Math.max(0.5, 1 - (noBtnAttempts * 0.1));
    
    // Apply transformation
    noBtn.style.transform = `translate(${newX}px, ${newY}px) scale(${newSize})`;
    
    // Change button text on attempts
    const noTexts = ['No', 'Are you sure?', 'Really?', 'Think again!', 'Please?', '🥺'];
    if (noBtnAttempts < noTexts.length) {
        noBtn.querySelector('.btn-text').textContent = noTexts[noBtnAttempts];
    }
}

// Event listeners for NO button
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Prevent NO button click
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Heart confetti animation
function createConfetti() {
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#ff1493', '#ff69b4', '#ff85c1', '#ffc0cb', '#ff6b9d', '#c71585'];
    
    // Confetti piece class
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * confettiCanvas.width;
            this.y = -20;
            this.size = Math.random() * 8 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.shape = Math.random() > 0.5 ? 'heart' : 'circle';
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > confettiCanvas.height) {
                this.y = -20;
                this.x = Math.random() * confettiCanvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            
            if (this.shape === 'heart') {
                // Draw heart shape
                ctx.beginPath();
                ctx.moveTo(0, this.size / 4);
                ctx.bezierCurveTo(-this.size / 2, -this.size / 4, -this.size, this.size / 4, 0, this.size);
                ctx.bezierCurveTo(this.size, this.size / 4, this.size / 2, -this.size / 4, 0, this.size / 4);
                ctx.fill();
            } else {
                // Draw circle
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        }
    }
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new ConfettiPiece());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Stop confetti after 10 seconds
    setTimeout(() => {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }, 10000);
}

// YES button click handler
yesBtn.addEventListener('click', () => {
    // Hide buttons
    buttonsContainer.style.display = 'none';
    
    // Show success message
    successMessage.classList.add('show');
    
    // Trigger confetti
    createConfetti();
    
    // Add extra celebration effects
    for (let i = 0; i < 30; i++) {
        setTimeout(createSparkle, i * 100);
    }
    
    // Increase falling hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(createFallingHeart, i * 200);
    }
    
    // Add screen flash effect
    document.body.style.animation = 'flash 0.5s ease-out';
});

// Add flash animation to document
const style = document.createElement('style');
style.textContent = `
    @keyframes flash {
        0%, 100% { background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 25%, #ffd4e8 50%, #ffc8e0 75%, #ffb6d9 100%); }
        50% { background: linear-gradient(135deg, #ffe0f0 0%, #ffd4e8 25%, #ffc8e0 50%, #ffb6d9 75%, #ffaad4 100%); }
    }
`;
document.head.appendChild(style);

// Handle window resize for confetti canvas
window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// Add hover effect to YES button (extra glow)
yesBtn.addEventListener('mouseenter', () => {
    yesBtn.style.boxShadow = '0 12px 40px rgba(255, 20, 147, 0.6)';
});

yesBtn.addEventListener('mouseleave', () => {
    yesBtn.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
});

// Prevent default touch behavior on NO button for mobile
noBtn.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// Add particle effect on mouse move (optional romantic effect)
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.fontSize = '12px';
        particle.style.opacity = '0.6';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '100';
        particle.textContent = '💕';
        particle.style.animation = 'sparkleFloat 2s ease-out';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
});

// Log when page is loaded
console.log('💘 Valentine Website Loaded Successfully! 💘');
console.log('Made with ❤️ for someone special');
