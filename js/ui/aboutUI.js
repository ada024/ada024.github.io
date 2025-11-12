"use strict";

class AboutUI {
    constructor() {
        this._callbacks = null
        this._container = document.getElementById('about-container');
    }

    clear() {
        this._container.replaceChildren();
    }

    addAbout(item) {
        const section = document.createElement('section');
        section.className = 'column';

        if (item) {
            const contentDiv = document.createElement('h3');
            contentDiv.style.whiteSpace = 'pre-line';
            contentDiv.textContent = item;
            section.appendChild(contentDiv);
        }
        this._container.appendChild(section);

    }


    registerCallbacks(hooks) {
        this._callbacks = hooks
    }


}