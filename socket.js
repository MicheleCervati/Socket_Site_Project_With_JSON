document.addEventListener("DOMContentLoaded", () => {
    fetch('socket.json')
        .then(response => response.json())
        .then(data => {
            // Imposta il titolo della pagina
            document.title = data.title;

            // Navbar
            const navbarLinks = data.navbar.links.map(link =>
                `<li class="nav-item">
                    <a class="nav-link ${link.name === "Socket" ? "active" : ""}" href="${link.href}">${link.name}</a>
                </li>`
            ).join('');
            document.querySelector('.navbar-nav').innerHTML = navbarLinks;

            // Header principale
            document.querySelector('.text-center h1').innerHTML = data.mainContent.header.title;
            document.querySelector('.text-center p').innerHTML = data.mainContent.header.subtitle;

            // Sezione 1: Come Funziona una Socket
            const section1 = data.mainContent.sections.find(section => section.id === "section1");
            if (section1) {
                const section1El = document.querySelector('.row:nth-child(2)');
                section1El.querySelector('img').src = section1.image.src;
                section1El.querySelector('img').alt = section1.image.alt;
                section1El.querySelector('h2').innerHTML = section1.title;
                section1El.querySelector('p').innerHTML = section1.text;
            }

            // Sezione 2: Tipologie di Socket
            const section2 = data.mainContent.sections.find(section => section.id === "section2");
            if (section2) {
                const section2El = document.querySelector('.row:nth-child(3)');
                section2El.querySelector('img').src = section2.image.src;
                section2El.querySelector('img').alt = section2.image.alt;
                section2El.querySelector('h2').innerHTML = section2.title;
                section2El.querySelector('p').innerHTML = `${section2.text} 
                    <a href="${section2.link.href}" class="text-decoration-none text-primary fw-bold">${section2.link.text}</a>`;
            }

            // Sezione Video
            const videoSection = data.mainContent.sections.find(section => section.id === "videoSection");
            if (videoSection) {
                const videoEl = document.querySelector('.row:nth-child(4)');
                videoEl.querySelector('iframe').src = videoSection.video.src;
                videoEl.querySelector('iframe').title = videoSection.video.title;
                videoEl.querySelector('p strong').innerHTML = videoSection.text;
            }

            // Footer
            document.querySelector('.footer .row .col-md-6:nth-child(2) h5').innerHTML = data.footer.author;

            const footerLinks = data.footer.links.map(link =>
                `<li><a href="${link.href}" class="text-white text-decoration-none">${link.name}</a></li>`
            ).join('');
            document.querySelector('.footer .row .col-md-6:nth-child(1) ul').innerHTML = footerLinks;

            const socialLink = data.footer.social.instagram;
            const socialEl = document.querySelector('.footer .text-white.me-3');
            socialEl.href = socialLink.href;
            socialEl.innerHTML = socialLink.text;
        })
        .catch(error => console.error('Errore nel caricamento del JSON:', error));
});
