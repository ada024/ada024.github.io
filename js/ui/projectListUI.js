"use strict";

class ProjectListUI {
    constructor() {
        this._callbacks = null
        this._container = document.getElementById('product-container');
    }

    clear() {
        this._container.replaceChildren();
    }

    addProject(item) {
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
            a.href = item.urisrc;
            a.target = '_blank';
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
         this._container.appendChild(section);


    }



    registerCallbacks(hooks) {
        this._callbacks = hooks
    }


}