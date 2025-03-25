document.addEventListener('DOMContentLoaded', () => {

    const page = location.pathname.split("/").pop();

    if (page === 'index.html' || page === '') {
        getProjects();
    } else if (page === 'exp.html') {
        getExp();
    }
});


function getProjects() {
    const container = document.getElementById('product-container');
    container.innerHTML = "Loading..."

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            container.innerHTML ="";
            data.forEach(item => {
                const section = document.createElement('section');

                section.className = ' column small-6 medium-4 large-3';

                const h3 = document.createElement('h3');
                h3.textContent = item.name;
                section.appendChild(h3);


                if (item.image) {
                    const img = document.createElement('img');
                    img.src = item.image;
                    img.alt = item.alt;
                    img.style.minWidth = '240px';
                    img.style.minHeight = '130px';
                    section.appendChild(img);
                }

                if (item.urisrc) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = 'https://url/33hs';
                    a.target = '_blank'; // Optional: open in new tab
                    a.rel = 'noopener noreferrer'; // Security best practice
                    const icon = document.createElement('i');
                    icon.className = 'fa fa-github';
                    a.appendChild(icon);
                    a.append(' GitHub');
                    li.appendChild(a);
                    section.appendChild(li);
                }

                const p = document.createElement('p');
                p.textContent = item.desc;
                section.appendChild(p);


                container.appendChild(section);

            });
        })
        .catch(error => {
            console.error('Error loading pies:', error);
            container.innerHTML = '<p>Failed to load projects</p>';
        });
}

function getExp() {
    console.log("fetching experiences ")
}


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelector('footer').classList.toggle('dark');
    document.querySelector('nav').classList.toggle('dark');
    document.querySelector('header').classList.toggle('dark');
}

let translations = {};

fetch('lang.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        updateLanguage('en'); // default language
    })
    .catch(error => {
        console.error("Error loading language file:", error);
    });

document.getElementById('language-select').addEventListener('change', function () {
    const selectedLang = this.value;
    updateLanguage(selectedLang);
});

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang][key] || key;
    });
}
