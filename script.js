document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeSwitch = document.getElementById('theme-switch');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeSwitch.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    };

    setTheme(savedTheme);

    themeSwitch.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // 2. Modal Logic
    const modal = document.getElementById('signup-modal');
    const openBtns = document.querySelectorAll('.open-modal');
    const closeBtn = document.querySelector('.close-modal');

    const toggleModal = (show) => {
        modal.classList.toggle('modal-active', show);
        document.body.style.overflow = show ? 'hidden' : 'auto';
    };

    openBtns.forEach(btn => btn.addEventListener('click', () => toggleModal(true)));
    closeBtn.addEventListener('click', () => toggleModal(false));
    window.addEventListener('click', (e) => { if (e.target === modal) toggleModal(false); });

    // 3. Scroll Reveal Logic (Fixed Class Selection)
    const revealOnScroll = () => {
        const elements = document.querySelectorAll('.card, .step-item');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'all 0.8s ease-out';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once to catch elements already in view

    // 4. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            navLinks.classList.remove('active');
        }
    });
});
// Mood Section Interaction
const moodSection = document.getElementById('mood-section');
const moodItems = document.querySelectorAll('.orbiting-mood');
const originalBg = "var(--bg-body)"; // Store original background

moodItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const newColor = item.getAttribute('data-color');
        const moodName = item.getAttribute('data-mood');
        
        // Update background color
        moodSection.style.backgroundColor = newColor;
        
        // Optional: Update the subtitle text to match the mood
        const subtitle = moodSection.querySelector('.mood-text p');
        subtitle.textContent = `You're feeling ${moodName}. We have resources to help you manage that.`;
    });

    item.addEventListener('mouseleave', () => {
        // Return to original color when mouse leaves
        moodSection.style.backgroundColor = ""; 
        const subtitle = moodSection.querySelector('.mood-text p');
        subtitle.textContent = "Find instant inspiration based on how you feel right now.";
    });
});
const moodData = {
    Happy: [
        { title: "Keep the Momentum", type: "Article", icon: "✍️" },
        { title: "High Energy Beats", type: "Playlist", icon: "🎵" },
        { title: "Gratitude Journaling", type: "Exercise", icon: "📓" }
    ],
    Anxious: [
        { title: "4-7-8 Breathing", type: "Exercise", icon: "🌬️" },
        { title: "Grounding Techniques", type: "Guide", icon: "🧘" },
        { title: "Lo-fi for Calm", type: "Audio", icon: "🎧" }
    ],
    Tired: [
        { title: "Power Nap Guide", type: "Tips", icon: "💤" },
        { title: "Digital Detox", type: "Article", icon: "📱" },
        { title: "Soft Instrumental", type: "Audio", icon: "🎹" }
    ]
    // Add Angry, Sad, and Peaceful here...
};

// Gallery Logic
const gallery = document.getElementById('mood-gallery');
const galleryContent = document.getElementById('gallery-content');
const galleryTitle = document.getElementById('gallery-title');

document.querySelectorAll('.orbiting-mood').forEach(item => {
    item.addEventListener('click', () => {
        const mood = item.getAttribute('data-mood');
        const resources = moodData[mood] || moodData['Anxious']; // Fallback
        
        galleryTitle.innerText = `Focus: ${mood}`;
        galleryContent.innerHTML = ''; // Clear old content

        resources.forEach(res => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.opacity = '1'; 
            card.style.transform = 'none';
            card.innerHTML = `
                <div style="font-size: 2rem;">${res.icon}</div>
                <h4 style="margin: 10px 0;">${res.title}</h4>
                <span class="badge" style="font-size: 0.6rem;">${res.type}</span>
            `;
            galleryContent.appendChild(card);
        });

        gallery.classList.add('modal-active');
    });
});

document.querySelector('.close-gallery').addEventListener('click', () => {
    gallery.classList.remove('modal-active');
});