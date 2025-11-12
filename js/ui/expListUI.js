"use strict";

class ExpListUI {
    constructor() {
        this._callbacks = null
        this._container = document.getElementById('exp-container');
    }

    clear() {
        this._container.replaceChildren();
    }

    addExp(item) {
        const section = document.createElement('section');
        section.className = ' column small-6 medium-4 large-3';


        if (item.company) {
            const h3 = document.createElement('h3');
            h3.textContent = item.company;
            section.appendChild(h3);
        }

        if (item.position) {
            const h5 = document.createElement('p');
            h5.textContent = item.position;
            section.appendChild(h5);
        }


        if (item.duration) {
            const p = document.createElement('p');
            p.textContent = item.duration;
            section.appendChild(p);
        }
        this._container.appendChild(section);

    }


    registerCallbacks(hooks) {
        this._callbacks = hooks
    }


}