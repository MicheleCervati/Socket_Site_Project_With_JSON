// Attende che il DOM sia completamente caricato prima di eseguire il codice
document.addEventListener("DOMContentLoaded", () => {
    // Recupera il file JSON 'ISO_OSI.json' tramite fetch
    fetch('ISO_OSI.json')
        .then(response => response.json())  // Converte la risposta in formato JSON
        .then(data => {
            // Imposta il titolo della pagina con il valore proveniente dal JSON
            document.title = data.title;

            // Navbar
            // Mappa i link dalla navbar nel JSON e crea dinamicamente gli elementi <li> con i rispettivi collegamenti
            const navbarLinks = data.navbar.links.map(link =>
                `<li class="nav-item">
                    <a class="nav-link ${link.name === "ISO/OSI" ? "active" : ""}" href="${link.href}">${link.name}</a>
                </li>`
            ).join('');  // Combina tutti i <li> in una singola stringa HTML
            // Inserisce la lista di link generata all'interno dell'elemento .navbar-nav
            document.querySelector('.navbar-nav').innerHTML = navbarLinks;

            // Header principale
            // Imposta il titolo e il sottotitolo dell'header principale con i dati provenienti dal JSON
            document.querySelector('.text-center h1').innerHTML = data.mainContent.header.title;
            document.querySelector('.text-center p').innerHTML = data.mainContent.header.subtitle;

            // Sezione 1: Il Layer di Trasporto
            // Trova la sezione con id "section1" nel JSON e aggiorna il contenuto della sezione corrispondente nel DOM
            const section1 = data.mainContent.sections.find(section => section.id === "section1");
            if (section1) {
                // Trova la seconda riga della pagina e aggiorna l'immagine, il titolo e il testo
                const section1El = document.querySelector('.row:nth-child(2)');
                section1El.querySelector('img').src = section1.image.src;
                section1El.querySelector('img').alt = section1.image.alt;
                section1El.querySelector('h2').innerHTML = section1.title;
                section1El.querySelector('p').innerHTML = section1.text;
            }

            // Sezione 2: Indirizzo della Socket
            // Trova la sezione con id "section2" nel JSON e aggiorna il contenuto della sezione corrispondente nel DOM
            const section2 = data.mainContent.sections.find(section => section.id === "section2");
            if (section2) {
                // Trova la terza riga della pagina e aggiorna l'immagine, il titolo e il testo
                const section2El = document.querySelector('.row:nth-child(3)');
                section2El.querySelector('img').src = section2.image.src;
                section2El.querySelector('img').alt = section2.image.alt;
                section2El.querySelector('h2').innerHTML = section2.title;
                section2El.querySelector('p').innerHTML = section2.text;
            }

            // Sezione 3: Tipi di Porta
            // Trova la sezione con id "section3" nel JSON e aggiorna il contenuto della sezione corrispondente nel DOM
            const section3 = data.mainContent.sections.find(section => section.id === "section3");
            if (section3) {
                // Trova la quarta riga della pagina e aggiorna l'immagine, il titolo e il testo
                const section3El = document.querySelector('.row:nth-child(4)');
                section3El.querySelector('img').src = section3.image.src;
                section3El.querySelector('img').alt = section3.image.alt;
                section3El.querySelector('h2').innerHTML = section3.title;

                // Assicurati che il testo e il link vengano visualizzati correttamente
                section3El.querySelector('p').innerHTML = section3.text;
            }

            // Footer
            // Imposta il nome dell'autore nel footer
            document.querySelector('.footer .row .col-md-6:nth-child(2) h5').innerHTML = data.footer.author;

            // Crea i link del footer a partire dai dati nel JSON
            const footerLinks = data.footer.links.map(link =>
                `<li><a href="${link.href}" class="text-white text-decoration-none">${link.name}</a></li>`
            ).join('');  // Combina tutti i <li> in una singola stringa HTML
            // Aggiunge i link generati nella colonna giusta del footer
            document.querySelector('.footer .row .col-md-6:nth-child(1) ul').innerHTML = footerLinks;

            // Sezione social (se presente)
            // Se il JSON contiene un link Instagram, lo inserisce nel footer
            if (data.footer.social && data.footer.social.instagram) {
                const socialLink = data.footer.social.instagram;
                const socialEl = document.querySelector('.footer .text-white.me-3');
                socialEl.href = socialLink.href;  // Imposta l'URL del link Instagram
                socialEl.innerHTML = socialLink.text;  // Imposta il testo del link (ad esempio, "Instagram")
            }
        })
        .catch(error => console.error('Errore nel caricamento del JSON:', error));  // Gestisce eventuali errori nel recupero del JSON
});
