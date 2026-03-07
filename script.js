document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeLabel = themeToggle.querySelector('span');

    function applyThemeUI(isDark) {
        themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        themeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }

    // Set initial button state
    applyThemeUI(document.documentElement.getAttribute('data-theme') === 'dark');

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        applyThemeUI(!isDark);
    });

    const navLinks = document.querySelectorAll('.navigation a');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active link on scroll
    function updateActiveNav() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        let current = '';

        // If near the top of the page, highlight the first section
        if (scrollTop < 100) {
            current = sections[0].getAttribute('id');
        }
        // If scrolled to the bottom of the page, highlight the last section
        else if (scrollTop + windowHeight >= documentHeight - 50) {
            current = sections[sections.length - 1].getAttribute('id');
        }
        // Otherwise, find the section currently in view
        else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollTop >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    // Run once on load to set initial state
    updateActiveNav();

    // Load Publications from global variable
    if (typeof publications !== 'undefined') {
        const publicationList = document.getElementById('publication-list');

        publications.forEach(pub => {
            const pubItem = document.createElement('div');
            pubItem.className = 'publication-item';

            let linkHtml = '';
            if (pub.link) {
                linkHtml = `<a href="${pub.link}" target="_blank" class="pub-link">Link</a>`;
            }

            pubItem.innerHTML = `
                <div class="pub-year">${pub.year}</div>
                <div class="pub-content">
                    <div class="pub-title">${pub.title}</div>
                    <div class="pub-authors">${pub.authors}</div>
                    <div class="pub-venue">${pub.venue} ${linkHtml}</div>
                </div>
            `;

            publicationList.appendChild(pubItem);
        });
    } else {
        console.error('Publications data not found. Make sure publications.js is loaded.');
    }
});

