const canvas = document.getElementById('footballCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match container
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Ball colors
const colors = ['yellow', 'blue', 'red', 'white'];

// Ball class
class Football {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 15;
        this.dx = (Math.random() - 0.5) * 8; // Random horizontal velocity
        this.dy = (Math.random() - 0.5) * 8; // Random vertical velocity
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add football pattern (simple lines)
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x - this.radius, this.y);
        ctx.lineTo(this.x + this.radius, this.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.radius);
        ctx.lineTo(this.x, this.y + this.radius);
        ctx.stroke();
    }

    update() {
        // Bounce off walls
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx * 0.95; // Add some energy loss
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy * 0.95; // Add some energy loss
        }

        // Keep ball within bounds
        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));

        // Update position
        this.x += this.dx;
        this.y += this.dy;
    }
}

// Create multiple footballs
const footballs = [];
for (let i = 0; i < 8; i++) {
    const x = Math.random() * (canvas.width - 30) + 15;
    const y = Math.random() * (canvas.height - 30) + 15;
    footballs.push(new Football(x, y));
}

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw all footballs
    footballs.forEach(football => {
        football.update();
        football.draw();
    });

    // Check for collisions between footballs
    for (let i = 0; i < footballs.length; i++) {
        for (let j = i + 1; j < footballs.length; j++) {
            const ball1 = footballs[i];
            const ball2 = footballs[j];
            
            const dx = ball2.x - ball1.x;
            const dy = ball2.y - ball1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < ball1.radius + ball2.radius) {
                // Collision detected - calculate new velocities
                const angle = Math.atan2(dy, dx);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);
                
                // Rotate velocities
                const vx1 = ball1.dx * cos + ball1.dy * sin;
                const vy1 = ball1.dy * cos - ball1.dx * sin;
                const vx2 = ball2.dx * cos + ball2.dy * sin;
                const vy2 = ball2.dy * cos - ball2.dx * sin;
                
                // Swap the velocities
                ball1.dx = vx2 * cos - vy1 * sin;
                ball1.dy = vy1 * cos + vx2 * sin;
                ball2.dx = vx1 * cos - vy2 * sin;
                ball2.dy = vy2 * cos + vx1 * sin;
                
                // Move balls apart to prevent sticking
                const overlap = (ball1.radius + ball2.radius - distance) / 2;
                ball1.x -= overlap * cos;
                ball1.y -= overlap * sin;
                ball2.x += overlap * cos;
                ball2.y += overlap * sin;
            }
        }
    }

    requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

// Start animation
animate();
