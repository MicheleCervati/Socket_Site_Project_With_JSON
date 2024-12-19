// Attende che il DOM sia completamente caricato prima di eseguire il codice
document.addEventListener("DOMContentLoaded", () => {
    // Recupera il file JSON 'Glossario.json' tramite fetch
    fetch('Glossario.json')
      .then(response => response.json())  // Converte la risposta in formato JSON
      .then(data => {
        // Imposta il titolo della pagina con il valore proveniente dal JSON
        document.title = data.title;

        // Navbar
        // Mappa i link dalla navbar nel JSON e crea dinamicamente gli elementi <li> con i rispettivi collegamenti
        const navbarLinks = data.navbar.links.map(link =>
          `<li class="nav-item">
            <a class="nav-link ${link.name === "Glossario" ? "active" : ""}" href="${link.href}">${link.name}</a>
          </li>`
        ).join('');  // Combina tutti i <li> in una singola stringa HTML
        // Inserisce la lista di link generata all'interno dell'elemento .navbar-nav
        document.querySelector('.navbar-nav').innerHTML = navbarLinks;

        // Header principale
        // Imposta il titolo e il sottotitolo dell'header principale con i dati provenienti dal JSON
        document.querySelector('.text-center h1').innerHTML = data.mainContent.header.title;
        document.querySelector('.text-center p').innerHTML = data.mainContent.header.subtitle;

        // Cards del Glossario
        // Per ogni "card" nel JSON, crea dinamicamente una card con titolo e descrizione
        data.mainContent.cards.forEach(card => {
          const cardEl = document.createElement('div');
          cardEl.classList.add('col');  // Aggiunge la classe per la colonna della card
          cardEl.innerHTML = `
            <div class="card h-100 shadow">
              <div class="card-body">
                <h5 class="card-title text-primary">
                  <a href="${card.link}" class="text-decoration-none text-primary">${card.title}</a>
                </h5>
                <p class="card-text">${card.description}</p>
              </div>
            </div>
          `;
          // Aggiunge la card appena creata alla riga (<div class="row">) della pagina
          document.querySelector('.row').appendChild(cardEl);
        });

        // Footer
        // Imposta il nome dell'autore nel footer
        document.querySelector('.footer .row .col-md-6:nth-child(2) h5').innerHTML = data.footer.author;

        // Crea i link del footer a partire dai dati nel JSON
        const footerLinks = data.footer.links.map(link =>
          `<li><a href="${link.href}" class="text-white text-decoration-none">${link.name}</a></li>`
        ).join('');  // Combina tutti i <li> in una singola stringa HTML
        // Aggiunge i link generati nella colonna giusta del footer
        document.querySelector('.footer .row .col-md-6:nth-child(1) ul').innerHTML = footerLinks;

        // Aggiungi il link di Instagram, se presente nel JSON
        if (data.footer.social && data.footer.social.instagram) {
          const socialEl = document.querySelector('.footer .text-white.me-3');
          socialEl.href = data.footer.social.instagram.href;  // Imposta l'URL del link Instagram
          socialEl.innerHTML = data.footer.social.instagram.text;  // Imposta il testo del link (ad esempio, "Instagram")
        }
      })
      .catch(error => console.error('Errore nel caricamento del JSON:', error));  // Gestisce eventuali errori nel recupero del JSON
});
