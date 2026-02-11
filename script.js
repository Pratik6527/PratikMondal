document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const modal = document.getElementById('celebration-modal');
    const memoriesBtn = document.getElementById('memories-btn');
    const memoriesSection = document.getElementById('memories-section');
    const backgroundMusic = document.getElementById('bg-music');

    // Check if elements exist to avoid errors
    if (!noBtn || !yesBtn || !modal || !memoriesBtn) return;

    // --- NO Button Logic ---
    // Function to move the button to a random position
    const moveNoButton = () => {
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate available space specifically within the viewport/window to keep it visible
        // But let's try to keep it somewhat near the container so it doesn't fly off too far initially
        // Actually, user requested "randomly to different positions on the screen"

        const maxX = window.innerWidth - btnRect.width - 20; // 20px padding
        const maxY = window.innerHeight - btnRect.height - 20;

        const randomX = Math.max(10, Math.random() * maxX);
        const randomY = Math.max(10, Math.random() * maxY);

        // Use fixed positioning to move it relative to viewport
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // Add a little rotation for extra fun
        const randomRotation = (Math.random() - 0.5) * 20; // -10 to 10 deg
        noBtn.style.transform = `rotate(${randomRotation}deg)`;
    };

    // Flag to track if infinite movement has started
    // let isMovingInfinitely = false;

    // Events to trigger the move
    const startInfiniteMove = () => {
        moveNoButton(); // Move immediately
        // if (!isMovingInfinitely) {
        //     isMovingInfinitely = true;
        //     // Move every 600ms forever
        //     setInterval(moveNoButton, 600);
        // }
    };

    noBtn.addEventListener('mouseover', startInfiniteMove);
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        startInfiniteMove();
    });
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click on mobile
        startInfiniteMove();
    });

    // --- YES Button Logic ---
    yesBtn.addEventListener('click', () => {
        // 1. Confetti Explosion
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
        });

        // Continuous confetti for a few seconds
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // 2. Play Music
        try {
            backgroundMusic.volume = 0.5;
            backgroundMusic.play().catch(err => {
                console.log("Auto-play prevented by browser. Interaction needed first.");
            });
        } catch (e) {
            console.error("Music play failed", e);
        }

        // 3. Show Celebration Modal
        modal.classList.remove('hidden');
        // Small delay to allow display:flex to apply before adding visible class for opacity transition
        setTimeout(() => {
            modal.classList.add('visible');
        }, 10);

        // 4. Send Confirmation (WhatsApp)
        // Replace '1234567890' with your actual phone number (including country code, e.g., 919876543210)
        const yourPhoneNumber = '917047448557';
        const message = "I said YES! 🥰💑 I'm yours now!";

        // Open WhatsApp in a new tab to send the message
        setTimeout(() => {
            window.open(`https://wa.me/${yourPhoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        }, 2000); // Wait 2 seconds so she sees the confetti first

    });

    // --- Memories Button Logic ---
    memoriesBtn.addEventListener('click', () => {
        // Hide modal
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.add('hidden');

            // Show Memories Section
            memoriesSection.classList.remove('hidden');

            // Scroll to it
            memoriesSection.scrollIntoView({ behavior: 'smooth' });
        }, 500); // Wait for fade out
    });
});

// Global function for gallery uploads
function updateImage(input, imgId) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        const img = document.getElementById(imgId);
        reader.onload = (e) => {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
