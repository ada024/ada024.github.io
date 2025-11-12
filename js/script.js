document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('language-select').addEventListener('change', function () {
        const selectedLang = this.value;
        updateLanguage(selectedLang);
    });

    loadModal();
});


function loadModal() {
    fetch('modal.html')
        .then(r => r.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);


            var modal = document.getElementById("aboutModal");


            var btn = document.getElementById("aboutBtn");

            var span = document.getElementsByClassName("close")[0];

            btn.onclick = function () {
                modal.style.display = "block";
            }
            span.onclick = function () {
                modal.style.display = "none";
            }

//  Clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

        });

}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelector('footer').classList.toggle('dark');
    document.querySelector('nav').classList.toggle('dark');
    document.querySelector('header').classList.toggle('dark');
    localStorage.setItem('darkMode', "true");
}

let translations = {};

fetch('lang.json')
    .then(response => response.json())
    .then(data => {
        translations = data;


        const storLang = localStorage.getItem('lang');
        if (storLang) {
            updateLanguage(storLang);

        } else {
            updateLanguage("en"); // default language
        }


    })
    .catch(error => {
        console.error("Error loading language file:", error);
    });


function updateLanguage(lang) {

    localStorage.setItem('lang', lang);
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang][key] || key;
    });
}


function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
}

let x = document.getElementById('hamburgerBtn');
x.onclick = toggleMenu;