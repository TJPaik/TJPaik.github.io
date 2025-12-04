document.addEventListener('DOMContentLoaded', () => {
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
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

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

