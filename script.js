// Funzione asincrona che carica i contenuti da un file JSON
async function caricaContenuti() {
    try {
        // Carica il file JSON usando la funzione fetch
        const response = await fetch('index.json');
        // Converte la risposta in formato JSON
        const dati = await response.json();
  
        // Seleziona l'elemento della navbar dal DOM
        const navbar = document.querySelector('.navbar-nav');
        // Itera sui link della navbar presenti nel file JSON
        dati.navbar.links.forEach(link => {
            // Crea un nuovo elemento <li> per ogni link
            const li = document.createElement('li');
            li.classList.add('nav-item');
            // Aggiunge l'HTML del link con la classe "active" se presente
            li.innerHTML = `<a class="nav-link${link.active ? ' active' : ''}" href="${link.href}">${link.text}</a>`;
            // Aggiunge il nuovo <li> alla navbar
            navbar.appendChild(li);
        });
  
        // Carica il titolo principale nella pagina
        document.querySelector('.display-4').textContent = dati.main.title;
        // Carica il sottotitolo principale nella pagina
        document.querySelector('.lead').textContent = dati.main.subtitle;
  
        // Seleziona il contenitore principale per le sezioni
        const container = document.querySelector('.container');
        // Itera sulle sezioni principali nel file JSON
        dati.main.sections.forEach((section, index) => {
            // Crea una riga (<div>) per ogni sezione
            const row = document.createElement('div');
            row.classList.add('row', 'align-items-center', 'mb-5');
  
            if (index === 1) {
                // Inverte l'ordine di testo e immagine per la seconda sezione
                row.innerHTML = `
                    <div class="col-md-6">
                        <h2 class="mb-3 text-primary">${section.title}</h2>
                        <p>${section.text} <a href="${section.link.href}" class="text-decoration-none text-primary fw-bold">${section.link.text}</a></p>
                    </div>
                    <div class="col-md-6">
                        <img src="${section.image}" class="img-fluid rounded shadow" alt="${section.alt}">
                    </div>
                `;
            } else {
                // Carica la sezione con testo a sinistra e immagine a destra
                row.innerHTML = `
                    <div class="col-md-6">
                        <img src="${section.image}" class="img-fluid rounded shadow" alt="${section.alt}">
                    </div>
                    <div class="col-md-6">
                        <h2 class="mb-3 text-primary">${section.title}</h2>
                        <p>${section.text} <a href="${section.link.href}" class="text-decoration-none text-primary fw-bold">${section.link.text}</a></p>
                    </div>
                `;
            }
  
            // Aggiunge la riga della sezione al contenitore
            container.appendChild(row);
        });
  
        // Carica i link rapidi nel footer
        const quickLinks = document.querySelector('.list-unstyled');
        dati.footer.quick_links.forEach(link => {
            // Crea un nuovo elemento <li> per ogni link rapido
            const li = document.createElement('li');
            li.innerHTML = `<a href="${link.href}" class="text-white text-decoration-none">${link.text}</a>`;
            // Aggiunge il link rapido alla lista del footer
            quickLinks.appendChild(li);
        });
  
        // Carica l'autore del footer
        document.querySelector('footer h5').textContent = dati.footer.author;
  
        // Seleziona la sezione dei social link nel footer
        const socialLinks = document.querySelector('footer div div:last-child');
        // Itera sui link dei social presenti nel file JSON
        dati.footer.social_links.forEach(social => {
            // Crea un link per ogni social media
            const a = document.createElement('a');
            a.href = social.href;
            a.classList.add('text-white', 'me-3');
            // Aggiunge l'icona del social e il nome della piattaforma
            a.innerHTML = `<i class="${social.icon}"></i> ${social.platform}`;
            // Aggiunge il link social alla sezione dei social
            socialLinks.appendChild(a);
        });
  
    } catch (error) {
        // Gestisce eventuali errori nel caricamento dei dati
        console.error('Errore nel caricamento dei contenuti:', error);
    }
  }
  
  // Chiamata alla funzione per caricare i contenuti appena la pagina è pronta
  caricaContenuti();
  