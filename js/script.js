document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('language-select').addEventListener('change', function () {
        const selectedLang = this.value;
        updateLanguage(selectedLang);
    });
});


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

        }else {
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