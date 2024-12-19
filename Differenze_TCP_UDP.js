// Attende che il DOM sia completamente caricato prima di eseguire il codice
document.addEventListener("DOMContentLoaded", () => {
  // Recupera il file JSON 'Differenze_TCP_UDP.json'
  fetch('Differenze_TCP_UDP.json')
    .then(response => response.json())  // Converte la risposta in formato JSON
    .then(data => {
      // Imposta il titolo della pagina con il valore proveniente dal JSON
      document.title = data.title;

      // Navbar
      // Mappa i link dalla navbar presente nel JSON e crea gli elementi <li> con i rispettivi collegamenti
      const navbarLinks = data.navbar.links.map(link =>
        `<li class="nav-item">
          <a class="nav-link ${link.name === "Protocolli" ? "active" : ""}" href="${link.href}">${link.name}</a>
        </li>`
      ).join('');  // Combina tutti i <li> in una stringa unica
      // Inserisce i link generati all'interno dell'elemento .navbar-nav
      document.querySelector('.navbar-nav').innerHTML = navbarLinks;

      // Header principale
      // Imposta il titolo e il sottotitolo nella sezione header
      document.querySelector('.text-center h1').innerHTML = data.mainContent.header.title;
      document.querySelector('.text-center p').innerHTML = data.mainContent.header.subtitle;

      // Sezioni principali
      // Per ogni sezione nel JSON, crea dinamicamente un elemento div per aggiungere il contenuto alla pagina
      data.mainContent.sections.forEach((section, index) => {
        const sectionEl = document.createElement('div');
        sectionEl.classList.add('row', 'align-items-center', 'mb-5', 'py-4');  // Crea una riga con alcune classi di stile

        let imageEl, contentEl;

        // Sezione 2 (indice 1): Inverti l'ordine di immagine e testo
        if (index === 1) {
          // Crea la sezione con il contenuto a sinistra e l'immagine a destra
          contentEl = `<div class="col-md-6">
                         <h2 class="mb-3 text-primary">${section.title}</h2>
                         ${section.text.map(paragraph => {
                           if (paragraph.includes('<ul>')) {
                             return paragraph; // Se contiene una lista, la restituisce senza modifiche
                           }
                           return `<p>${paragraph}</p>`; // Altrimenti crea un normale paragrafo
                         }).join('')}
                       </div>`;
          // Crea l'elemento per l'immagine a destra
          imageEl = `<div class="col-md-6"><img src="${section.image.src}" alt="${section.image.alt}" class="img-fluid rounded shadow"></div>`;
        } else {
          // Sezione 1 o 3: Mantieni l'ordine originale (immagine a sinistra, testo a destra)
          imageEl = `<div class="col-md-6"><img src="${section.image.src}" alt="${section.image.alt}" class="img-fluid rounded shadow"></div>`;
          contentEl = `<div class="col-md-6">
                         <h2 class="mb-3 text-primary">${section.title}</h2>
                         ${section.text.map(paragraph => {
                           if (paragraph.includes('<ul>')) {
                             return paragraph; // Se contiene una lista, la restituisce senza modifiche
                           }
                           return `<p>${paragraph}</p>`; // Altrimenti crea un normale paragrafo
                         }).join('')}
                       </div>`;
        }

        // Combina l'immagine e il contenuto e aggiungilo alla sezione
        sectionEl.innerHTML = imageEl + contentEl;
        // Aggiunge la sezione alla pagina, all'interno del contenitore principale
        document.querySelector('.container').appendChild(sectionEl);
      });

      // Footer
      // Imposta l'autore nel footer
      document.querySelector('.footer .row .col-md-6:nth-child(2) h5').innerHTML = data.footer.author;

      // Crea i link del footer a partire dai dati nel JSON
      const footerLinks = data.footer.links.map(link =>
        `<li><a href="${link.href}" class="text-white text-decoration-none">${link.name}</a></li>`
      ).join('');  // Combina tutti i <li> in una stringa unica
      // Aggiunge i link al footer nella colonna giusta
      document.querySelector('.footer .row .col-md-6:nth-child(1) ul').innerHTML = footerLinks;

      // Aggiungi il link di Instagram, se presente nel JSON
      if (data.footer.social && data.footer.social.instagram) {
        const socialEl = document.querySelector('.footer .text-white.me-3');
        socialEl.href = data.footer.social.instagram.href;  // Imposta l'URL di Instagram
        socialEl.innerHTML = data.footer.social.instagram.text;  // Imposta il testo del link (ad esempio, "Instagram")
      }
    })
    .catch(error => console.error('Errore nel caricamento del JSON:', error));  // Gestisce eventuali errori nel recupero del JSON
});
